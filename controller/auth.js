const { StatusCodes } = require('http-status-codes')
const Organisation = require('../models/organisation')
const Employee = require('../models/employee')
const TPIP = require('../models/tpip')

const createOrganisation = async (req, res) => {

    const { first_name, last_name, email, password, phone_number } = req.body;

    try {
        const organisation = await Organisation.create({ ...req.body });

        const employeeData = {
            first_name,
            last_name,
            email,
            password,
            password,
            organisationId: organisation._id,
            role: "admin",
            portalAccess: true,
            inventory: true,
            hrManagement: true,
            finance: true,
            tpip: true,
          };

        const employee = await Employee.create({employeeData});
        const token = employee.createJWT()

        organisation.admin = employee._id
        await organisation.save()

        return res.status(StatusCodes.CREATED).json({
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Organisation creation failed"});
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


const generateTpipToken = async (req, res) => {

    const { email, password } = req.body;

    try {
        const tpip = await TPIP.findOne({ email: email })
        const isPasswordCorrect = await tpip.comparePasswords(password)

        if (!tpip || !isPasswordCorrect) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Incorrect credentials, kindly try again or sign up if you dont have an account",
            })
        } else {
            const token = tpip.createJWT()
            res.status(StatusCodes.OK).json({
                token,
                message: "this token is valid for 12 hours, use it for your subsequent requests"
            })

        }
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Incorrect credentials, kindly try again or sign up if you dont have an account",
        })
    }
}


module.exports = { createOrganisation, login, generateTpipToken }