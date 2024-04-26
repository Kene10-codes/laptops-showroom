const Joi = require('joi')

const userRegister = Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(5).required(),
})

module.exports = {
    userRegister,
}
