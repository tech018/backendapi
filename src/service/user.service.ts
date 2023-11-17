import { encryptPassword } from "../utils/encription";
import generator from "../utils/generator";
import mailer from "../utils/mailer";
import httpStatus from "http-status";
import { Users } from "../models/user.model";
import { Otp } from "../models/otp.model";

const getUserByEmail = async (email:string) => {
  const user = await Users.findOne({email})
  if(user) return {
    status: httpStatus.OK,
    response: {
      email: user.email,
      name: user.name,
      role: user.role,
      password: user.password,
      verified: user.verified,
      id: user._id
    }
  }
  return null
};


const createUser = async (
  email: string,
  password: string,
  name: string,
  role: string
) => {
  try {
    const checkEmail = await getUserByEmail(email);
  if (checkEmail) {
    return {
      status: httpStatus.BAD_REQUEST,
      response: `${email} is already registered`
    };
  }

  const newuser = new Users({
    email,
    password:await encryptPassword(password),
    role,
    name,
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

    await Otp.create({email, otp: generatedNumber, expiration: generator.expiration()})

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
  } catch (error) {
    console.log("error", error)
  }
};

const queryUsers = async () => {
  const users = await Users.find();
  return users;
};


const getUserById = async (id: string)=> {
  const user = await Users.findById(id)
  if(user) return {
    status: httpStatus.OK,
    response: {
      email: user.email,
      name: user.name,
      role: user.role,
      id: user.id,
    }
  }
  return null
}





export default {
  createUser,
  queryUsers,
  getUserByEmail,
  getUserById,
};
