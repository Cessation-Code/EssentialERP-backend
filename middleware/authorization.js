const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Organisation = require('../models/organisation');

const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication Invalid" });

    } else {

        const token = authHeader.split(' ')[1]

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const organisation = await Organisation.findOne({ _id: payload.organisation_id});
            req.employee = {
                employee_id: payload.employee_id,
                first_name: payload.first_name,
                last_name: payload.last_name,
                organisation_id: payload.organisation_id,
                organisation_name: organisation.organisation_name
            }
            next()

        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication Invalid" })
        }
    }

}

module.exports = auth