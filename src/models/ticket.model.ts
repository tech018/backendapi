import { Schema, Types, model } from "mongoose";

export interface Collaborator {
  email: string;
  name: string;
}

export interface Attachments {
  fileName: string;
  fileType: string;
}

export interface ITickets {
  clientId: Types.ObjectId;
  assignee: Collaborator;
  name: string;
  reporter: Collaborator;
  prioLevel: number;
  descriptions: string;
  attachments: Array<Attachments>;
}

const ticketSchema = new Schema<ITickets>({
  clientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Client",
  },
  assignee: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  reporter: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  prioLevel: {
    type: Number,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  attachments: [
    {
      fileName: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Tickets = model<ITickets>("Tickets", ticketSchema);
