import * as Joi from "joi";

const createUserSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  role: Joi.string().required(),
});

const getUserSchema = Joi.object({
  userId: Joi.string().required(),
});

export default {
  createUserSchema,
  getUserSchema,
};
