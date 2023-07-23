const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    organisation_id: {
        type: ObjectId,
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
        type: ObjectId,
        required: true
    },
    modified_at: {
        type: Date,
        required: false
    },
    modified_by: {
        type: ObjectId,
        required: false
    }

})

module.exports = mongoose.model('Expense', ExpenseSchema)
