import * as Joi from "joi";

const clientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  contact_number: Joi.string().required(),
  logo: Joi.string().required(),
});

const clientUpdateSchema = Joi.object({
  value: Joi.string().required(),
  key: Joi.string().required(),
  clientId: Joi.number().required(),
});

const clientDeleteSchema = Joi.object({
  clientId: Joi.number().required(),
});

export default {
  clientSchema,
  clientUpdateSchema,
  clientDeleteSchema,
};
