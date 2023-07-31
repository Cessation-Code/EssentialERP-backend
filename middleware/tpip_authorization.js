const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const TPIP = require('../models/tpip')

const tpip_auth = async (req, res, next) => {

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
            await TPIP.findOne({ _id: payload.tpip_id})
            req.tpip = {
                tpip_id: payload.tpip_id,
                name: payload.name,
                email: payload.email,
                password: payload.last_name,
                secret_key: payload.secret_key,
                organisation_id: payload.organisation_id,
            }
            next()
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication Invalid" })
        }
    }

}

module.exports = tpip_auth