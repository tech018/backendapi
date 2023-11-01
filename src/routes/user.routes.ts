import express from "express";
import { createValidator } from "express-joi-validation";
const validator = createValidator();
const router = express.Router();
import userModule from "../modules/user.module";
import requestValidation from "../schema/users/user.schema.validation";

router
  .route("/")
  .post(
    validator.body(requestValidation.createUserSchema),
    userModule.createUser
  )
  .get(userModule.queryUsers);

router
  .route("/details")
  .get(validator.query(requestValidation.getUserSchema), userModule.getUser);

export default router;
