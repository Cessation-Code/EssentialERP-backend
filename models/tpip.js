const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

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
    secret_key: {
        type: String,
        required: true,
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

TpipSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.secret_key = await bcrypt.hash(this.secret_key, salt)
})

TpipSchema.methods.compareSecretKeys = async function (tpipSecretKey) {
    const isMatch = await bcrypt.compare(tpipSecretKey, this.secret_key)
    return isMatch
}

module.exports = mongoose.model('TPIP', TpipSchema)