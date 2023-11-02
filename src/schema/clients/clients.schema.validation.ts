import * as Joi from "joi";

const loginSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  contact_number: Joi.string().required(),
  logo: Joi.string().required(),
});
