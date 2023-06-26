const Sale = require('../models/sale')
const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')

const createSale = async (req, res) => {

    const { organisation_id, tpip_id, product_id, payment_method, number, amount, created_by } = req.body
    const created_at = new Date();

    // check if organisation exists
    const organisation = await Organisation.findOne({ _id: organisation_id }).catch( error => {
        console.log(error);
    });

    if (!organisation_id || !product_id || !payment_method || !number || !amount || !organisation) {
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