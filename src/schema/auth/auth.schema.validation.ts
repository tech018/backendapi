import * as Joi from "joi";

const loginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().email().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const activateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
});

const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().required().min(6),
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});

export default {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  activateUserSchema,
};
