import { Schema, model } from "mongoose";

export interface IUsers {
  email: string;
  mobile: number;
  password: string;
  otp: number;
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
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
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
