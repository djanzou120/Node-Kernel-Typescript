import Joi from 'joi';
import {schema} from "../../utils/schemas";

export const indexSchema = Joi.object({
    email : schema.email,
    password : schema.password_min
})