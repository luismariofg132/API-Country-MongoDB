import Joi from "joi";

const countrySchema = Joi.object({
    id: Joi.string(),
    country_name: Joi.string().required(),
    country_short_name: Joi.string().min(2).required(),
    country_phone_code: Joi.number().min(2).required()
})

export default countrySchema;