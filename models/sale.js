const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const SaleSchema = new mongoose.Schema({
    organisation_id: {
        type: ObjectId,
        required: true
    },
    tpip_id: {
        type: ObjectId,
        required: true,
    },
    product_id: {
        type: ObjectId,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('Sale', SaleSchema)