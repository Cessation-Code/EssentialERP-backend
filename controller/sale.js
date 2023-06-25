const Sale = require('../models/sale')
const { StatusCodes } = require('http-status-codes')

const createSale = async (req, res) => {

    const { organisation_id, tpip_id, product_id, payment_method, number, amount, created_by } = req.body
    const created_at = new Date();

    if (!organisation_id || !tpip_id || !product_id || !payment_method || !number || !amount) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            await Sale.create({
                organisation_id: organisation_id,
                tpip_id: tpip_id,
                product_id: product_id,
                payment_method: payment_method,
                number: number,
                amount: amount,
                created_by: created_by,
                created_at: created_at
            })
            res.status(StatusCodes.OK).json({
                message: "sale added successfully"
            })
        } catch (error) {
            res.status(StatusCodes.EXPECTATION_FAILED).json({
                message: "An error occured please try again"
            })
        }

    }
}

module.exports = { createSale }