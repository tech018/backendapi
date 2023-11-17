import { Schema, model } from "mongoose";

export interface Iotp {
  otp: number;
  expiration: string;
  email: string
}

const otpSchema = new Schema<Iotp>({
  otp: {
    type: Number,
    required: true,
  
  },
  expiration: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  }
});

export const Otp = model<Iotp>("Otp", otpSchema);
