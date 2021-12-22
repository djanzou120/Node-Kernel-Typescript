import Joi from 'joi';

export const schema = {
    email : Joi.string().email().required(),
    password_min : Joi.string().required(),
    password : Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)),
    firstname : Joi.string().required().min(2),
    lastname : Joi.string().min(2),
    phone : Joi.string().required().min(9),
    code : Joi.number().min(100000).max(999999)
}