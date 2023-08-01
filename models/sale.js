const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const SaleSchema = new mongoose.Schema({
    organisation_id: {
        type: ObjectId,
        required: false
    },
    tpip_id: {
        type: ObjectId,
        required: false,
    },
    products: {
        type: Array,
        required: true,
    },
    payment_method: {
        type: String,
        required: false,
    },
    number: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    created_by: {
        type: ObjectId,
        required: false
    },
    created_at: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('Sale', SaleSchema)