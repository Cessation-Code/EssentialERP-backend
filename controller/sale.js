const Sale = require('../models/sale')
const Product = require('../models/product')
const { StatusCodes } = require('http-status-codes')

const createSale = async (req, res) => {

    const { products, number, amount, payment_method, description } = req.body;
    let enoughStock = true;

    // first check if the stock is enough
    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const quantity = product.quantity

        const foundProduct = await Product.findOne({ _id: product._id })
        // console.log(foundProduct)
        if (!foundProduct) {
            enoughStock = false;
            return res.status(StatusCodes.BAD_REQUEST).json({ message: `${product.name} not found in database` })
        }
        if (foundProduct.stock < quantity) {
            enoughStock = false;
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Stock not enough' })
        }
    }

    if (enoughStock) {
        try {
            for (let i = 0; i < products.length; i++) {
                const product = products[i]
                const quantity = product.quantity
                // update each product's stock
                const foundProduct = await Product.findOne({ _id: product._id })
                foundProduct.stock = foundProduct.stock - quantity
                await foundProduct.save()
            }
            // create sale record
            await Sale.create({
                organisation_id: req.employee.organisation_id,
                products: products,
                payment_method: payment_method,
                number: number,
                amount: amount,
                description: description,
                created_by: req.employee.employee_id,
                created_at: new Date()
            })
            return res.status(StatusCodes.CREATED).json({ message: 'Sale created' })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

}

const getSales = async (req, res) => {
    try {
        const sales = await Sale.find({ organisation_id: req.employee.organisation_id })
        return res.status(StatusCodes.OK).json({ sales })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
        console.log(error)
    }
}

module.exports = { createSale, getSales }