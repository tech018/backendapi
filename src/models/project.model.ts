import { Schema, Types, model } from "mongoose";
import { Collaborator } from "./ticket.model";

export interface IProject {
  clientId: Types.ObjectId;
  name: string;
  collaborator: Array<Collaborator>;
  budget: string;
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
  },
  collaborator: [
    {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
  ],
  budget: {
    type: String,
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Client",
  },
});

export const Project = model<IProject>("Project", projectSchema);
