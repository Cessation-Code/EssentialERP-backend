const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema ({
    organisation_id: {
        type: ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_at:{
        type: Date,
        required: true,
    },
    created_by: {
        type: ObjectId,
        required: true,
    },
    modified_at: {
        type: Date,
        required: true,
    },
    modified_by: {
        type: ObjectId,
        required: true,
    }
})

module.exports = mongoose.model('Product', ProductSchema)