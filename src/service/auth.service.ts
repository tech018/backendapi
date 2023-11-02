import httpStatus from "http-status";
import userService from "./user.service";
import { encryptPassword, isPasswordMatch } from "../utils/encription";
import generator from "../utils/generator";
import mailer from "../utils/mailer";
import prisma from "../config/client";
import moment from "moment";
import tokenService from "./token.service";

const existOtp = async (email: string) => {
  const query = await prisma.otp.findUnique({
    where: {
      email,
    },
  });

  if (query) return query;

  return null;
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await userService.checkEmail(email);

    if (!user?.email)
      return {
        response: "Invalid login credentials",
        status: httpStatus.UNAUTHORIZED,
      };

    if (!user || !(await isPasswordMatch(password, user.password as string))) {
      return {
        status: httpStatus.UNAUTHORIZED,
        response: "Invalid login credentials",
      };
    }

    if (!user || !user.isEmailVerified)
      return {
        status: httpStatus.BAD_REQUEST,
        response: "User not yet verified",
      };

    const generatedToken = await tokenService.generateAuthTokens(user);

    if (generatedToken)
      return {
        response: {
          email: user.email,
          name: user.name,
          id: user.id,
          role: user.role,
          tokens: generatedToken,
        },
        status: httpStatus.OK,
      };
  } catch (error) {
    return {
      response: error,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

const forgotPassword = async (email: string) => {
  const user = await userService.checkEmail(email);

  if (!user?.email)
    return {
      response: "Email not registered!",
      status: httpStatus.NOT_FOUND,
    };

  try {
    const generatedNumber = generator.randomNumber(6);
    const mailOptions = {
      from: '"Zep Network and Data Solution" <zepnds@gmail.com>',
      to: email,
      subject: "Password Reset OTP Code",
      text: "Greetings from Zep Network and Data Solution",
      html: `<span>here is your OTP <h3>${generatedNumber}</h3></span>
        `,
    };

    const checkotp = await existOtp(email);
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
        response: `We send your otp in your email ${email}`,
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
        response: `We send your otp in your email ${email}`,
        status: httpStatus.OK,
        expiration: moment(otp.expires).utc(),
      };
    }
  } catch (error) {
    return {
      response: "Email transfer failed",
      status: httpStatus.BAD_REQUEST,
    };
  }
};

const activateUser = async (email: string, otpRequest: number) => {
  try {
    const otp = await existOtp(email);
    const user = await userService.checkEmail(email);

    if (!otp?.Otp && user?.isEmailVerified)
      return {
        status: httpStatus.OK,
        response: `Your account is already activated`,
      };
    if (otpRequest !== otp?.Otp)
      return {
        status: httpStatus.BAD_REQUEST,
        response: "OTP not match or invalid",
      };

    if (otp && moment(generator.currentDate).isAfter(moment(otp?.expires)))
      return {
        status: httpStatus.BAD_REQUEST,
        response: "OTP is expired",
      };

    const successUpdate = await prisma.user.update({
      where: {
        email,
      },
      data: {
        isEmailVerified: true,
      },
    });

    if (successUpdate) {
      const deleteOtp = await prisma.otp.delete({
        where: {
          email,
        },
      });
      if (deleteOtp)
        return {
          status: httpStatus.OK,
          response: "Successfully activate your account",
        };
      return {
        status: httpStatus.BAD_REQUEST,
        response: "There is something wrong in our end",
      };
    }
    return {
      status: httpStatus.BAD_REQUEST,
      response: "There is something wrong in our end",
    };
  } catch (error) {
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: error,
    };
  }
};

const changePassword = async (
  otpRequest: number,
  email: string,
  newpassword: string
) => {
  try {
    const otp = await existOtp(email);

    if (otpRequest !== otp?.Otp)
      return {
        status: httpStatus.BAD_REQUEST,
        response: "OTP not match or invalid",
      };

    if (otp && moment(generator.currentDate).isAfter(moment(otp?.expires)))
      return {
        status: httpStatus.BAD_REQUEST,
        response: "OTP is expired",
      };

    const successUpdate = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: await encryptPassword(newpassword),
      },
    });
    if (successUpdate)
      return {
        status: httpStatus.OK,
        response: "Password has been change",
      };

    return {
      status: httpStatus.BAD_REQUEST,
      response: "There is something wrong in our end",
    };
  } catch (error) {
    return {
      status: httpStatus.BAD_REQUEST,
      response: "There is something wrong in our end",
    };
  }
};

export default {
  loginUser,
  forgotPassword,
  existOtp,
  activateUser,
  changePassword,
};
