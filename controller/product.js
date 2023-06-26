const Product = require('../models/product')
const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {

    const { organisation_id, price, name, stock, description, created_by } = req.body
    const created_at = new Date();

    // check if organisation exists
    const organisation = await Organisation.findOne({ _id: organisation_id }).catch(error => {
        console.log(error);
    });

    if (!organisation_id || !price || !name || !stock || !description || !created_by || !organisation) {
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
                modified_at: created_at,
                modified_by: created_by,

            })
            res.status(StatusCodes.OK).json({
                message: "product added successfully"
            })
        } catch (error) {
            if (error.code == 11000) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "This product name is already being used"
                })
            } else {
                res.status(StatusCodes.EXPECTATION_FAILED).json({
                    message: "An error occured please try again"
                })
            }
        }

    }
}

module.exports = { createProduct }