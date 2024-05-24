const Joi = require('joi')

const userRegister = Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(8).required(),
})

const userLogin = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).required(),
})
const userResetEmail = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
})

const validateNewPassword = Joi.object({
    password: Joi.string().min(8).required(),
})

module.exports = {
    userLogin,
    userRegister,
    userResetEmail,
    validateNewPassword,
}
