import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { Attachments, Collaborator } from "../../models/ticket.model";
import { Types } from "mongoose";

export interface createTicketRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    assignee: Collaborator;
    clientId: Types.ObjectId;
    name: string;
    reporter: Collaborator;
    prioLevel: number;
    descriptions: string;
    attachments: Array<Attachments>;
  };
}

export interface getTicketRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    role: string;
    email: string;
  };
}
