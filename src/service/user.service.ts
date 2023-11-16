import { encryptPassword } from "../utils/encription";
import generator from "../utils/generator";
import mailer from "../utils/mailer";
import httpStatus from "http-status";
import authService from "./auth.service";
import moment from "moment";
import { Users } from "../models/user.model";

const createUser = async (
  email: string,
  password: string,
  name: string,
  role: string
) => {
  const checkEmail = await getUserByEmail(email);
  if (checkEmail) {
    return undefined;
  }

  const newuser = new Users({
    email,
    password: encryptPassword(password),
    role: "user",
    otp: generator.randomNumber(10),
    verified: false,
  });

  const user = await newuser.save();

  if (user) {
    const emailTitle = "Verify Email";
    const message =
      "To complete your registration your need to follow this button to activate your account";
    const generatedNumber = generator.randomNumber(6);
    const mailOptions = {
      from: '"Zep Network and Data Solution" <zepnds@gmail.com>',
      to: email,
      subject: "Verification Code",
      text: "Greetings from Zep Network and Data Solution",
      html: mailer.generateHtmlEmail(
        emailTitle,
        email,
        name,
        message,
        generatedNumber
      ),
    };

    await mailer.sendEmail(mailOptions);
    return {
      response: `Successfully registered, We send your otp in your email ${email} to verify your email`,
      status: httpStatus.OK,
    };
  } else {
    return {
      response: "Something wrong in our user registration",
      status: httpStatus.BAD_REQUEST,
    };
  }
};

const queryUsers = async () => {
  const users = await Users.find();
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
};
