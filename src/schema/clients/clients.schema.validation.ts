import * as Joi from "joi";

const clientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  contact_number: Joi.string().required(),
  logo: Joi.string().required(),
});

const clientUpdateSchema = Joi.object({
  clientId: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  contact_number: Joi.string().required(),
  logo: Joi.string().required(),
});

const clientUpdateSingleSchema = Joi.object({
  value: Joi.string().required(),
  key: Joi.string().required(),
  clientId: Joi.string().required(),
});

const clientDeleteSchema = Joi.object({
  clientId: Joi.string().required(),
});

export default {
  clientSchema,
  clientUpdateSchema,
  clientDeleteSchema,
  clientUpdateSingleSchema,
};
