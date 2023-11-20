import { Schema, model } from "mongoose";

export interface IClient {
  email: string;
  address: string;
  logo: string;
  contact_number: string;
  name: string;
  projectType: string;
}

const clientSchema = new Schema<IClient>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  projectType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
});

export const Client = model<IClient>("Client", clientSchema);
