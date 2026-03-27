const Joi = require('joi');

const createNotesSchema = Joi.object({
    title : Joi.string().min(5).max(100).required(),
    content : Joi.string().min(6).required()
});

const editNotesSchema = Joi.object({
        title : Joi.string().min(5).max(100).optional(),
    content : Joi.string().min(6).optional()
})

module.exports = { createNotesSchema ,editNotesSchema } ;