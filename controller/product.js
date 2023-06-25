const Product = require('../models/product')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {

    const { organisation_id, price, name, stock, description, created_by, modified_by } = req.body
    const created_at = new Date();
    const modified_at = created_at

    if (!organisation_id || !price || !name || !stock || !description || !created_by || !modified_by) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            await Product.create({
                organisation_id: organisation_id,
                price: price,
                name: name,
                stock: stock,
                description: description,
                created_at: created_at,
                created_by: created_by,
                modified_at: modified_at,
                modified_by: modified_by,

            })
            res.status(StatusCodes.OK).json({
                message: "product added successfully"
            })
        } catch (error) {
            res.status(StatusCodes.EXPECTATION_FAILED).json({
                message: "An error occured please try again"
            })
        }

    }
}

module.exports = { createProduct }