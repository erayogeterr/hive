const Joi = require("joi");

// const createValidation = Joi.object({
//     firstName: Joi.string().required().min(3),
//     lastName: Joi.string().required().min(3),
//     email: Joi.string().email().required().min(8),
//     password: Joi.string().required().min(8),
// })

const createValidation = Joi.object({
    firstName: Joi.string().required().min(3).empty('').messages({
        'any.required': 'Adınızı giriniz.',
        'string.min': 'Adınız en az 3 karakter içermelidir.',
        'string.empty': 'İsim alanı boş geçilemez',
    }),
    lastName: Joi.string().required().min(3).empty('').messages({
        'any.required': 'Soyadınızı giriniz.',
        'string.min': 'Soyadınız en az 3 karakter içermelidir.',
        'string.empty': 'Soyisim alanı boş geçilemez',
    }),
    email: Joi.string().email().required().min(8).empty('').messages({
        'any.required': 'E-posta adresinizi giriniz.',
        'string.email': 'Lütfen geçerli bir e-posta adresi giriniz.',
        'string.min': 'E-posta adresiniz en az 8 karakter içermelidir.',
        'string.empty': 'Email alanı boş geçilemez',
    }),
    password: Joi.string().required().min(8).empty('').messages({
        'any.required': 'Şifrenizi giriniz.',
        'string.min': 'Şifreniz en az 8 karakter içermelidir.',
        'string.empty': 'Şifre alanı boş geçilemez',
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
    email: Joi.string().email().required().min(8).empty('').messages({
        'any.required': 'E-posta adresinizi giriniz.',
        'string.email': 'Lütfen geçerli bir e-posta adresi giriniz.',
        'string.min': 'E-posta adresiniz en az 8 karakter içermelidir.',
        'string.empty': 'Email alanı boş geçilemez',
    }),
    password: Joi.string().required().min(8).empty('').messages({
        'any.required': 'Şifrenizi giriniz.',
        'string.min': 'Şifreniz en az 8 karakter içermelidir.',
        'string.empty': 'Şifre alanı boş geçilemez',
    }),
});

// const resetPasswordValidation = Joi.object({
//     email: Joi.string().email().required().min(8),

// });

const resetPasswordValidation = Joi.object({
    email: Joi.string().email().required().min(8).empty('').messages({
        'any.required': 'E-posta adresinizi giriniz.',
        'string.email': 'Lütfen geçerli bir e-posta adresi giriniz.',
        'string.min': 'E-posta adresiniz en az 8 karakter içermelidir.',
        'string.empty': 'Email alanı boş geçilemez',
        
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