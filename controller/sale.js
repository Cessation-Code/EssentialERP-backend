const Sale = require('../models/sale')
const Product = require('../models/product')
const { StatusCodes } = require('http-status-codes')

const createSale = async (req, res) => {

    const { products, number, amount, payment_method } = req.body;
    let enoughStock = true;

    // first check if the stock is enough
    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const product_id = product.product_id
        const quantity = product.quantity

        const foundProduct = await Product.findOne({ _id: product_id })
        if (!foundProduct){
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
                organisation_id: req.user.organisation_id,
                products: products,
                payment_method: payment_method,
                number: number,
                amount: amount,
                created_by: req.employee_id,
                created_at: new Date()
            })
            res.status(StatusCodes.CREATED).json({ message: 'Sale created' })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

}

module.exports = { createSale }