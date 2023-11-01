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
  mailer: envVars.GOOGLE_SENDER_EMAIL,
  mailerSecret: envVars.GOOGLE_CLIENT_SECRET,
  mailerID: envVars.GOOGLE_CLIENT_ID,
  mailerToken: envVars.GOOGLE_REFRESH_TOKEN,
  mailerUri: envVars.GOOGLE_REDIRECT_URI,
  mailerService: envVars.GOOGLE_MAILER_SERVICE,
  mailerType: envVars.GOOGLE_MAILER_TYPE,
};
