import { Role } from "@prisma/client";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export interface createUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    password: string;
    email: string;
    name?: string;
    role: Role;
  };
}

export interface getUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    userId: number;
  };
}
