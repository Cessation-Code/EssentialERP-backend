const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    organisation_id: {
        type: String,
        required: true  
    },
    name: {
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
    },
    created_by: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Expense', ExpenseSchema)
