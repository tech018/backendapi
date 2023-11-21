import * as Joi from "joi";

export const createProjectSchema = Joi.object({
  collaborator: Joi.array().items({
    email: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string().required(),
  }),
  budget: Joi.string().required(),
  details: Joi.string().required(),
  type: Joi.string().required(),
  clientId: Joi.string().required(),
  name: Joi.string().required(),
});
