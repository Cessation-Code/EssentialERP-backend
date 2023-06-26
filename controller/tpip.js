const TPIP = require('../models/tpip')
const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')

const createTPIP = async (req, res) => {

    const { organisation_id, name, secret_key, created_by } = req.body
    const created_at = new Date();

    // check if organisation exists
    const organisation = await Organisation.findOne({ _id: organisation_id }).catch( error => {
        console.log(error);
    });

    if (!organisation_id || !name || !secret_key || !created_by || !organisation) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            await TPIP.create({
                organisation_id: organisation_id,
                name: name,
                secret_key: secret_key,
                created_at: created_at,
                created_by: created_by
            })
            res.status(StatusCodes.OK).json({
                message: "Third Party Integrator Platform added successfully"
            })
        } catch (error) {
            console.log(error)
            res.status(StatusCodes.EXPECTATION_FAILED).json({
                message: "An error occured please try again"
            })
        }

    }
}

module.exports = { createTPIP }