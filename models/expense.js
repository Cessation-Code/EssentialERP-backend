const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    kf_employee_id: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('Expense', ExpenseSchema)
