const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    order_id: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        required: false,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    }
})

mongoose.model('Payment', PaymentSchema)