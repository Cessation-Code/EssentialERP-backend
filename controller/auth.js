const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const Organisation = require('../models/organisation')


const createOrganisation = async (req, res) => {

    try {
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
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An Error Occured, kindly try again",
        })
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
                name: organisation.organisation_name,
                email: organisation.email
            })
        }
    }
}

module.exports = { createOrganisation, loginOrganisation }