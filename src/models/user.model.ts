import { Schema, model } from "mongoose";

export interface IUsers {
  email: string;
  password: string;
  role: string;
  verified: boolean;
  name: string;
}

const userSchema = new Schema<IUsers>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

export const Users = model<IUsers>("Users", userSchema);
