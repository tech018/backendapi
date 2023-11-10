import { Client } from "@prisma/client";
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

export interface updateClientRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    clientId: number;
    name: string;
    email: string;
    address: string;
    contact_number: string;
    logo: string;
  };
}

export interface updateSingleClientRequestSchema
  extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    clientId: number;
    key: keyof Client;
    value: string;
  };
}

export interface deleteClientRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    clientId: number;
  };
}
