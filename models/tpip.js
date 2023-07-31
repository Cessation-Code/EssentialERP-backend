const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const TpipSchema = new mongoose.Schema({
    organisation_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    secret_key: {
        type: String,
        default: function () {
            return uuidv4()
        },
    },
    created_at: {
        type: Date,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    }

})

// TpipSchema.pre("save", async function(){
//     const salt = await bcrypt.genSalt(10)
//     this.secret_key = await bcrypt.hash(this.secret_key, salt)
// })

TpipSchema.methods.compareSecretKeys = async function (tpipSecretKey) {
    if (tpipSecretKey !== this.secret_key) {
        return false
    } else {
        return true
    }
}

TpipSchema.methods.comparePasswords = async function (password) {
    if (password !== this.password) {
        return false
    } else {
        return true
    }
}

TpipSchema.methods.createJWT = function () {
    return jwt.sign({
        tpip_id: this._id,
        organisation_id: this.organisation_id,
        name: this.name,
        email: this.email,
        secret_key: this.secret_key
    },
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

module.exports = mongoose.model('TPIP', TpipSchema)