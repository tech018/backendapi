import express from "express";
import { createValidator } from "express-joi-validation";
import { createProjectSchema } from "../schema/project/project.schema.validation";
import projectModule from "../modules/project.module";

const validator = createValidator();
const router = express.Router();

router
  .route("/create")
  .post(validator.body(createProjectSchema), projectModule.createProject);

export default router;
