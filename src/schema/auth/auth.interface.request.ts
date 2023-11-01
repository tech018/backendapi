import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export interface loginUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    password: string;
    email: string;
  };
}

export interface forgotPasswordSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    email: string;
  };
}

export interface activateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    email: string;
    otp: number;
  };
}

export interface resetPasswordSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string;
    otp: string;
    newPassword: string;
  };
}
