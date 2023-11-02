import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export interface createClientRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    email: string;
    address: string;
    contact_number: string;
    logo: string;
  };
}
