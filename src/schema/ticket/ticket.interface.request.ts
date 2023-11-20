import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { Attachments, Collaborator, ITickets } from "../../models/ticket.model";
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
    clientId: Types.ObjectId;
  };
}

export interface deleteTicketRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    ticketIds: Array<string>;
  };
}

export interface updateTicketRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    ticketId: Types.ObjectId;
    key: keyof ITickets;
    value: string | number;
  };
}
