const Joi = require("joi");

const createValidation = Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().email().required().min(8),
    password :Joi.string().required().min(8),
})

const loginValidation = Joi.object({
    email : Joi.string().email().required().min(8),
    password : Joi.string().required().min(8),
});

module.exports = {
    createValidation,
    loginValidation,
}