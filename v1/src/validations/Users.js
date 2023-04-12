const Joi = require("joi");

// const createValidation = Joi.object({
//     firstName: Joi.string().required().min(3),
//     lastName: Joi.string().required().min(3),
//     email: Joi.string().email().required().min(8),
//     password: Joi.string().required().min(8),
// })

const createValidation = Joi.object({
    firstName: Joi.string().required().min(3).messages({
        'any.required': 'Adınızı giriniz.',
        'string.min': 'Adınız en az 3 karakter içermelidir.'
    }),
    lastName: Joi.string().required().min(3).messages({
        'any.required': 'Soyadınızı giriniz.',
        'string.min': 'Soyadınız en az 3 karakter içermelidir.'
    }),
    email: Joi.string().email().required().min(8).messages({
        'any.required': 'E-posta adresinizi giriniz.',
        'string.email': 'Lütfen geçerli bir e-posta adresi giriniz.',
        'string.min': 'E-posta adresiniz en az 8 karakter içermelidir.'
    }),
    password: Joi.string().required().min(8).messages({
        'any.required': 'Şifrenizi giriniz.',
        'string.min': 'Şifreniz en az 8 karakter içermelidir.'
    }),
})

const updateValidation = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email().min(8),
})


// const loginValidation = Joi.object({
//     email: Joi.string().email().required().min(8),
//     password: Joi.string().required().min(8),
// });
const loginValidation = Joi.object({
    email: Joi.string().email().required().min(8).messages({
        'any.required': 'E-posta adresinizi giriniz.',
        'string.email': 'Lütfen geçerli bir e-posta adresi giriniz.',
        'string.min': 'E-posta adresiniz en az 8 karakter içermelidir.'
    }),
    password: Joi.string().required().min(8).messages({
        'any.required': 'Şifrenizi giriniz.',
        'string.min': 'Şifreniz en az 8 karakter içermelidir.'
    }),
});

// const resetPasswordValidation = Joi.object({
//     email: Joi.string().email().required().min(8),

// });

const resetPasswordValidation = Joi.object({
    email: Joi.string().email().required().min(8).messages({
        'any.required': 'E-posta adresinizi giriniz.',
        'string.email': 'Lütfen geçerli bir e-posta adresi giriniz.',
        'string.min': 'E-posta adresiniz en az 8 karakter içermelidir.'
    }),

});

const changePasswordValidation = Joi.object({
    newpassword: Joi.string().required().min(8),
    oldpassword: Joi.string().required().min(8),

});

module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    updateValidation,
    changePasswordValidation,
}