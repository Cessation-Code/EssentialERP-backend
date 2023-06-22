const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const Organisation = require('../models/organisation')
const Employee = require('../models/employee')


const createOrganisation = async (req, res) => {

    try{
        const organisation = await Organisation.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({
            organisation: {
                name: organisation.organisation_name,
                email: organisation.email,
                address: organisation.address,
                first_name: organisation.first_name,
                last_name: organisation.last_name
            },
            message: "created",
        })
    }catch(error){
        if(error.code == 11000){
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'This email has already been used, login or choose a new one'
            })
        }
    }

}

const loginOrganisation = async (req, res) => {
    const { email, password } = req.body;

    // check if email exists in db
    const organisation = await Organisation.findOne({ email })

    if (!organisation) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Incorrect credentials, kindly try again or sign up if you dont have an account",
        })
    } else {
        // compare password
        const isPasswordCorrect = await organisation.comparePassword(password)
        // console.log(isPasswordCorrect)
        if (!isPasswordCorrect) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Incorrect credentials, kindly try again or sign up if you dont have an account",
            })
        } else {
            res.status(StatusCodes.OK).json({
                organisation: organisation,
                message:"success"
            })
        }
    }
}

const createEmployee = async (req, res) => {

    try{
        const employee = await Employee.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({
            employee: {
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                organisation_id: employee.organisation_id,
                portal_access: employee.portal_access,
                tpip: employee.tpip,
                hr_management: employee.hr_management,
                inventory: employee.inventory,
                finances: employee.finance
            },
            message: "created",
        })
    }catch(error){
        if(error.code == 11000){
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'This email has already been used, choose a new one'
            })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message
            })
        }
    }

}

const loginEmployee = async (req, res) => {

    const { email, password } = req.body;

    // check if email exists in db
    const employee = await Employee.findOne({ email })

    if (!employee) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Incorrect credentials, kindly try again or sign up if you dont have an account",
        })
    } else {
        // compare password
        const isPasswordCorrect = await employee.comparePassword(password)
        // console.log(isPasswordCorrect)
        if (!isPasswordCorrect) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Incorrect credentials, kindly try again or sign up if you dont have an account",
            })
        } else {
            res.status(StatusCodes.OK).json({
                employee: {
                    first_name: employee.first_name,
                    last_name: employee.last_name_name,
                    email: employee.email,
                    organisation_id: employee.organisation_id,
                    portal_access: employee.portal_access,
                    hr_management: employee.hr_management,
                    finances: employee.finance,
                    inventory: employee.inventory,
                    tpip: employee.tpip
                },
                message:"success"
            })
        }
    }

}



module.exports = { createOrganisation, loginOrganisation, createEmployee, loginEmployee }