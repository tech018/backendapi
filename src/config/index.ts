import Joi from "joi";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development").required(),
    PORT: Joi.number().default(8000),
    GOOGLE_SENDER_EMAIL: Joi.string().required().email(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_REFRESH_TOKEN: Joi.string().required(),
    GOOGLE_REDIRECT_URI: Joi.string().required(),
    GOOGLE_MAILER_SERVICE: Joi.string().required(),
    GOOGLE_MAILER_TYPE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().required(),
    FRONTEND_URL: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  frontendURL: envVars.FRONTEND_URL,
  mailer: envVars.GOOGLE_SENDER_EMAIL,
  mailerSecret: envVars.GOOGLE_CLIENT_SECRET,
  mailerID: envVars.GOOGLE_CLIENT_ID,
  mailerToken: envVars.GOOGLE_REFRESH_TOKEN,
  mailerUri: envVars.GOOGLE_REDIRECT_URI,
  mailerService: envVars.GOOGLE_MAILER_SERVICE,
  mailerType: envVars.GOOGLE_MAILER_TYPE,
  mongouri: envVars.MONGO_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    expirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    expirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    expirationPassMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    expirationEmailMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};
