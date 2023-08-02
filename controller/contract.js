const { StatusCodes } = require('http-status-codes')
const Contract = require('../models/contract')
const Employee = require('../models/employee')

const createContract = async (req, res) => {
    const { employee_id, type, salary } = req.body;
    const employee = await Employee.findOne({ _id: employee_id })

    if (!employee || !type || !salary) {
        res.status(StatusCodes.BAD_REQUEST)
    } else {
        try {
            const contract = await Contract.create({
                employee_id: employee_id,
                type: type,
                salary: salary,
                status: "Active",
                start_date: new Date(),
                end_date: !end_date ? "" : end_date
            })
            res.status(StatusCodes.CREATED).json({
                contract: contract,
                message: "created"
            })
        } catch (e) {
            console.log(e)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

const deleteContract = async (req, res) => {
    const { contract_id } = req.body;

    if (!contract_id) {
        res.status(StatusCodes.BAD_REQUEST)
    } else {
        try {
            const contract = await Contract.findOne({ _id: contract_id })
            res.status(StatusCodes.OK).json({
                contract: contract,
                message: "deleted"
            })
        } catch (e) {
            console.log(e)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

const getContracts = async (req, res) => {

    const { employee_id } = req.body;
    const employee = await Employee.findOne({ _id: employee_id })


    if (!employee) {
        res.status(StatusCodes.BAD_REQUEST)
    } else {
        try {
            const contracts = await Contract.find({ employee_id: employee_id })
            res.status(StatusCodes.OK).json({
                contracts: contracts,
                message: "retrieved"
            })
        } catch (e) {
            console.log(e)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

module.exports = {
    createContract,
    deleteContract,
    getContracts
}