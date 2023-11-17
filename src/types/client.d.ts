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
  email: string
  name: string
  mobile: string
  role: string
}
export type status = Number | String