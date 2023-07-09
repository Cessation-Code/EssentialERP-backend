const { StatusCodes } = require('http-status-codes')
const Organisation = require('../models/organisation')
const Employee = require('../models/employee')

const createOrganisation = async (req, res) => {

    const { first_name, last_name, email, password, phone_number } = req.body;

    try {
        const organisation = await Organisation.create({ ...req.body }).catch(error => { console.log(error) })

        const employee = await Employee.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            phone_number_1: phone_number,
            organisation_id: organisation._id,
            role: "admin",
            portal_access: true,
            inventory: true,
            hr_management: true,
            finance: true,
            tpip: true
        }).catch(error => { console.log(error) })

        const token = employee.createJWT()

        organisation.admin = employee._id

        await organisation.save().catch(error => { console.log(error) })
        res.status(StatusCodes.CREATED).json({
            // organisation: {
            //     name: organisation.organisation_name,
            //     email: organisation.email
            // },
            employee: {
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                organisation_name: organisation.organisation_name
            },
            token,
            message: "created"
        })
    } catch (error) {
        if (error.code == 11000) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'This email has already been used, login or choose a new one'
            })
        }
    }

}

const createEmployee = async (req, res) => {

    try {
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
    } catch (error) {
        if (error.code == 11000) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'This email has already been used, choose a new one'
            })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message
            })
        }
    }

}

const login = async (req, res) => {

    const { email, password } = req.body;

    // check if email exists in db
    const employee = await Employee.findOne({ email }).catch(error => { console.log(error) })
    const organisation = await Organisation.findOne({ _id: employee.organisation_id }).catch(error => { console.log(error) })

    // create token to secure data and for authentication
    const token = employee.createJWT()

    if (!employee || !organisation) {
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
                    last_name: employee.last_name,
                    email: employee.email,
                    organisation_name: organisation.organisation_name,
                    // organisation_id: employee.organisation_id,
                    // portal_access: employee.portal_access,
                    // hr_management: employee.hr_management,
                    // finances: employee.finance,
                    // inventory: employee.inventory,
                    // tpip: employee.tpip
                },
                token,
                message: "success"
            })
        }
    }

}



module.exports = { createOrganisation, createEmployee, login }