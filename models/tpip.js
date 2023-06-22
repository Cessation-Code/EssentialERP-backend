const mongoose = require('mongoose')

const TpipSchema = new mongoose.Schema({
    organisation_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    secret_key: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    }

})

module.exports = mongoose.models('TPIP', TpipSchema)