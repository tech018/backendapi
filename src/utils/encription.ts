import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import config from "../config";
import { IUser } from "../types/client";



export const encryptPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hashSync(password, salt);
  return passwordHash;
};

export const isPasswordMatch = async (
  password: string,
  userPassword: string
) => {
  return bcrypt.compare(password, userPassword);
};

export const generateToken = (user: IUser) => {
  const privateKey = config.jwt.secret
  const { id, email, role, name } = user;
  const expTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  return jwt.sign(
    {
      exp: expTime,
      userInfo: { email, id, role, name },
    },
    privateKey
  );
};