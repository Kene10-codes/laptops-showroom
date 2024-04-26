const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    brandName: {
        type: String,
        trim: true,
        maxlength: 255,
        required: true,
    },
    ramSize: {
        type: String,
        trim: true,
        maxlength: 255,
        required: true,
    },
    processor: {
        type: String,
        trim: true,
        maxlength: 255,
        required: true,
    },
    storage: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
})

const Product = mongoose.model('product', productSchema)

exports.productSchema = productSchema
exports.Product = Product
