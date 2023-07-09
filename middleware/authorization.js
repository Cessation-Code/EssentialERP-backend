const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Organisation = require('../models/organisation')

const auth = async (req, res, next) => {

    // validate authHeader
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication Invalid" })
    } else {
        // receive token
        const token = authHeader.split(' ')[1]

        // validate token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            const organisation = await Organisation.findOne({ _id: payload.organisation_id}).catch(error => { console.log(error) })
            req.employee = {
                employee_id: payload.employee_id,
                first_name: payload.first_name,
                last_name: payload.last_name,
                organisation_id: payload.organisation_id,
                organisation_name: organisation.organisation_name
            }
            next()
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication Invalid" })
        }
    }

}

module.exports = auth