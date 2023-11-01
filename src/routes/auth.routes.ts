import express from "express";
import { createValidator } from "express-joi-validation";
import authModule from "../modules/auth.module";
import requestValidation from "../schema/auth/auth.schema.validation";

const validator = createValidator();
const router = express.Router();

router
  .route("/login")
  .post(validator.body(requestValidation.loginSchema), authModule.loginUser);

router
  .route("/forgot")
  .post(
    validator.query(requestValidation.forgotPasswordSchema),
    authModule.forgotPassword
  );
router
  .route("/activate")
  .post(
    validator.query(requestValidation.activateUserSchema),
    authModule.activateUser
  );

router
  .route("/changepassword")
  .post(
    validator.body(requestValidation.resetPasswordSchema),
    authModule.changePassword
  );

export default router;
