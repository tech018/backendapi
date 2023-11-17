
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export interface createUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    password: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface getUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    userId: string;
  };
}
