const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            maxlength: 255,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 255,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            minlength: 5,
            maxlength: 255,
            lowercase: true,
            required: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            unique: true,
            sparse: true,
            required: true,
        },
        password: {
            type: String,
            minlength: 8,
            trim: true,
            required: true,
        },
        lastActive: {
            type: String,
            required: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

// TOKEN METHOD
userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        { id: this._id, admin: this.isAdmin },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '1d' }
    )

    return token
}
// INSTANCE OF USER SCHEMA
const User = mongoose.model('user', userSchema)

// EXPORT FILE AND SCHEMA
exports.userSchema = userSchema
exports.User = User
