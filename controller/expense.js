const Expense = require('../models/expense')
const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')

const createExpense = async (req, res) => {

    const { created_by, organisation_id, amount, description } = req.body
    const created_at = new Date();

    // check if organisation exists
    const organisation = await Organisation.findOne({ _id: organisation_id }).catch( error => {
        console.log(error);
    });

    if (!created_by || !organisation_id || !amount || !description || !organisation) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            await Expense.create({
                organisation_id: organisation_id,
                amount: amount,
                description: description,
                created_by: created_by,
                created_at: created_at
            })
            res.status(StatusCodes.OK).json({
                message: "expense added successfully"
            })
        } catch (error) {
            res.status(StatusCodes.EXPECTATION_FAILED).json({
                message: "An error occured please try again"
            })
        }

    }
}

module.exports = { createExpense }