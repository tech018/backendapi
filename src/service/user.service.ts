import { User, Role } from "@prisma/client";
import prisma from "../config/client";
import { encryptPassword } from "../utils/encription";
import generator from "../utils/generator";
import mailer from "../utils/mailer";
import httpStatus from "http-status";
import authService from "./auth.service";
import moment from "moment";

const createUser = async (
  email: string,
  password: string,
  name?: string,
  role: Role = Role.USER
) => {
  const checkEmail = await getUserByEmail(email);
  if (checkEmail) {
    return undefined;
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await encryptPassword(password),
      role,
    },
  });

  const generatedNumber = generator.randomNumber(6);
  const mailOptions = {
    from: '"Zep Network and Data Solution" <zepnds@gmail.com>',
    to: email,
    subject: "Verification Code",
    text: "Greetings from Zep Network and Data Solution",
    html: `<span>here is your OTP <h3>${generatedNumber}</h3></span>
        `,
  };

  const checkotp = await authService.existOtp(email);
  if (checkotp?.email) {
    const otp = await prisma.otp.update({
      where: {
        email,
      },
      data: {
        Otp: generatedNumber,
        expires: generator.expiration(),
      },
    });
    if (otp) await mailer.sendEmail(mailOptions);
    return {
      response: `Successfully registered, We send your otp in your email ${email} to verify your email`,
      status: httpStatus.OK,
      expiration: moment(otp.expires).format("lll"),
    };
  } else {
    const otp = await prisma.otp.create({
      data: {
        email,
        Otp: generatedNumber,
        expires: generator.expiration(),
        userId: user.id,
      },
    });
    if (otp) await mailer.sendEmail(mailOptions);
    return {
      response: `Successfully registered, We send your otp in your email ${email} to verify your email`,
      status: httpStatus.OK,
      expiration: moment(otp.expires).format("lll"),
    };
  }
};

const queryUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async <Key extends keyof User>(
  id: number,
  keys: Key[] = [
    "id",
    "email",
    "name",
    "password",
    "role",
    "isEmailVerified",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key> | null>;
};

const getUserByEmail = async (email: string): Promise<boolean> => {
  const query = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });
  if (query?.email) return true;
  return false;
};

const getUser = async (email: string): Promise<User | undefined> => {
  const query = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (query) return query;
};

const checkEmail = async (email: string): Promise<User | null> => {
  const query = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (query) return query;

  return null;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  checkEmail,
  getUser,
};
