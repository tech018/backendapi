import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { IProject } from "../../models/project.model";

export interface createProjectRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IProject;
}
