const Expense = require('../models/expense')
const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')

const createExpense = async (req, res) => {

    const { created_by, organisation_id, name, amount, description } = req.body
    const created_at = new Date();

    // check if organisation exists
    const organisation = await Organisation.findOne({ _id: organisation_id }).catch( error => {
        console.log(error);
    });

    // make sure all none of the request body params are empty
    if (!created_by || !organisation_id || !name || !amount || !description || !organisation) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            // create new expense record
            await Expense.create({
                organisation_id: organisation_id,
                name: name,
                amount: amount,
                description: description,
                created_by: created_by,
                created_at: created_at,
                modified_at: created_at,
                modified_by: created_by
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

const getExpenses = async (req, res) => {

    const organisation_id = req.employee.organisation_id;
    
    // check if organisation exists
    const organisation = await Organisation.findOne({ _id: organisation_id }).catch( error => {
        console.log(error);
    });

    if (!organisation_id || !organisation) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            // get all expenses for the organisation
            const expenses = await Expense.find({ organisation_id: organisation_id }).catch( error => {
                console.log(error);
            });
            res.status(StatusCodes.OK).json({
                message: "expenses retrieved successfully",
                expenses: expenses
            })
        } catch (error) {
            res.status(StatusCodes.EXPECTATION_FAILED).json({
                message: "An error occured please try again"
            })
        }

    }
}


const deleteExpense = async (req, res) => {
    const { _id } = req.body

    // make sure all none of the request body params are empty
    if (!_id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            // delete expense record
            await Expense.deleteOne({ _id: _id })
            res.status(StatusCodes.OK).json({
                message: "expense deleted successfully"
            })
        } catch (error) {
            res.status(StatusCodes.EXPECTATION_FAILED).json({
                message: "An error occured please try again"
            })
        }

    }
}


const editExpense = async (req, res) => {
    const { _id , name, amount, description} = req.body

    // make sure all none of the request body params are empty
    if (!_id || !name || !amount || !description) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            await Expense.updateOne({ _id: _id }, {
                name: name,
                amount: amount,
                description: description,
                modified_at: new Date(),
                modified_by: req.employee.employee_id
            })
            res.status(StatusCodes.OK).json({
                message: "expense updated successfully"
            })
        } catch (error) {
            res.status(StatusCodes.EXPECTATION_FAILED).json({
                message: "An error occured please try again"
            })
        }
    }
}



module.exports = { createExpense, getExpenses, deleteExpense, editExpense }