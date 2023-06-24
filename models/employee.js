const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: false,
        minlength:2
    },
    last_name: {
        type: String,
        required: false,
        minlength:2
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    phone_number_1: {
        type: String,
        required: true,
        minlength:10
    },
    phone_number_2: {
        type: String,
        required: true,
        minlength:10
    },
    organisation_id: {
        type: ObjectId,
        required: true,
    },
    portal_access: {
        type: Boolean,
        required: true,
        default: false
    },
    inventory:{
        type: Boolean,
        required: true,
        default: false
    },
    hr_management:{
        type: Boolean,
        required: true,
        default: false
    },
    finance:{
        type: Boolean,
        required: true,
        default: false
    },
    tpip:{
        type: Boolean,
        required: true,
        default: false
    }

})

EmployeeSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

EmployeeSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('Employee', EmployeeSchema)