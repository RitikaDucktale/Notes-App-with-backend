const Joi = require('joi');

const signUpSchema = Joi.object({
    firstName : Joi.string().min(3).max(30).required(),
    lastName : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required(),  

})

const loginSchema = Joi.object({
email : Joi.string().email().required(),
    password : Joi.string().min(6).required(),  
});

module.exports = { signUpSchema,loginSchema };