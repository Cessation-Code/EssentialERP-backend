const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const OrganisationSchema = new mongoose.Schema({
    organisation_name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
        trim: true
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
    address: {
        type: String,
        required: false,
        minlength: 6
    },
    first_name: {
        type: String,
        required: false,
        minlength:2
    },
    last_name: {
        type: String,
        required: false,
        minlength:2
    }

})

OrganisationSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

OrganisationSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('Organisation', OrganisationSchema)