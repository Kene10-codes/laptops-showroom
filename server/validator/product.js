const Joi = require('joi')

const addProductValidate = Joi.object({
    brand: Joi.string().required(),
    ram: Joi.string().required(),
    processor: Joi.string().required(),
    storage: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
})

module.exports = {
    addProductValidate,
}
