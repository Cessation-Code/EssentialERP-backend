const TPIP = require('../models/tpip')
const Sale = require('../models/sale')
const Product = require('../models/product')
const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')

const tpipSale = async (req, res) => {
    const { products } = req.body;
    // calculate amount
    const amount = products.reduce((acc, product) => {
        return acc + (product.quantity * product.price);
    }, 0);
    let enoughStock = true;

    // first check if the stock is enough
    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const product_id = product.product_id
        const quantity = product.quantity

        const foundProduct = await Product.findOne({ _id: product_id })
        if (!foundProduct) {
            enoughStock = false;
            res.status(StatusCodes.BAD_REQUEST).json({ message: `${product.name} not found in database` })
            break;
        }
        if (foundProduct.stock < quantity) {
            enoughStock = false;
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Stock not enough' })
            break;
        }
    }


    if (enoughStock) {
        try {
            for (let i = 0; i < products.length; i++) {
                const product = products[i]
                const product_id = product.product_id
                const quantity = product.quantity
                // update each product's stock
                const foundProduct = await Product.findOne({ _id: product_id })
                foundProduct.stock = foundProduct.stock - quantity
                await foundProduct.save()
            }
            // create sale record
            await new Sale.create({
                organisation_id: req.tpip.organisation_id,
                tpip_id: req.tpip._id,
                products: products,
                amount: amount,
                created_at: new Date()
            })
            res.status(StatusCodes.CREATED).json({ message: 'Sale created' })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }
}


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ organisation_id: req.tpip.organisation_id })
        res.status(StatusCodes.OK).json({ products })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
    }
}

module.exports = { tpipSale, getProducts }