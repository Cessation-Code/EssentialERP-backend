const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const ContractSchema = new mongoose.Schema({
    employee_id: {
        type: ObjectId,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    salary: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Inactive'],
            message: '{VALUE} is not supported'
        }
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: false
    }

})

module.exports = mongoose.model('Contract', ContractSchema)