import { Types } from "mongoose";

export interface IClient {
  email: string;
  name: string;
  address: string;
  contact_number: string;
  logo: string;
}

export interface ClientID {
  id: number;
}

export interface IUser {
  email: string;
  name: string;
  role: string;
  id: Types.ObjectId;
}
export type status = Number | String;
