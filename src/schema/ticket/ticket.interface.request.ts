import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { Attachments, Collaborator } from "../../models/ticket.model";
import { Types } from "mongoose";
import { selectedId } from "../../service/tickets.service";

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
    ticketIds: Array<selectedId>;
  };
}
