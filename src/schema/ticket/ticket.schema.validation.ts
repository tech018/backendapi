import * as Joi from "joi";

export const createTicketSchema = Joi.object({
  clientId: Joi.string().required(),
  name: Joi.string().required(),
  prioLevel: Joi.number().required(),
  descriptions: Joi.string().required(),
  attachments: Joi.array().items({
    fileName: Joi.string().required(),
    fileType: Joi.string().required(),
  }),
  assignee: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
  }),
  reporter: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

export const getTicketSchema = Joi.object({
  role: Joi.string().required(),
  email: Joi.string().required(),
});
