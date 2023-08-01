const { StatusCodes } = require('http-status-codes')
const TPIP = require('../models/tpip')
const jwt = require('jsonwebtoken')


const createTPIP = async (req, res) => {

    const { email, password, name } = req.body

    if (!email || !password || !name) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please fill in all required fields"
        })
    } else {
        try {
            const tpip = await TPIP.create({
                email: email,
                password: password,
                organisation_id: req.employee.organisation_id,
                name: name,
                created_by: req.employee.employee_id,
                created_at: new Date()
            }).catch(error => { console.log(error) })
            res.status(StatusCodes.CREATED).json({
                message: "TPIP created successfully",
                tpip: {
                    name: tpip.name,
                    email: tpip.email,
                    organisation_id: tpip.organisation_id,
                    created_by: tpip.created_by
                }
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong, please try again" })
        }
    }
}



const getTPIP = async (req, res) => {
    
        try {
            const tpip = await TPIP.find({ organisation_id: req.employee.organisation_id }).catch(error => { console.log(error) })
            res.status(StatusCodes.OK).json({
                message: "TPIP retrieved successfully",
                tpip: tpip
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong, please try again" })
        }
}


const deleteTPIP = async (req, res) => {
    const { _id } = req.body
    try {
        await TPIP.deleteOne({ _id: _id })
        res.status(StatusCodes.OK).json({ message: "TPIP deleted successfully" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong, please try again" })
    }
}

module.exports = {
    createTPIP,
    getTPIP,
    deleteTPIP
}