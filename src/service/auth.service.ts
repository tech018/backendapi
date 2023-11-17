import httpStatus from "http-status";
import userService from "./user.service";
import { encryptPassword, isPasswordMatch, generateToken } from "../utils/encription";
import generator from "../utils/generator";
import mailer from "../utils/mailer";
import moment from "moment";
import { Otp } from "../models/otp.model";
import { Users } from "../models/user.model";


const checkOtp = async (email: string)=> {
  const otp = await Otp.findOne({email})
  if(otp) return otp
  return null
}

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await userService.getUserByEmail(email);

    if (!user?.response?.email)
      return {
        response: "Invalid login credentials",
        status: httpStatus.UNAUTHORIZED,
      };

    if (!user || !(await isPasswordMatch(password, user.response.password as string))) {
      return {
        status: httpStatus.UNAUTHORIZED,
        response: "Invalid login credentials",
      };
    }

    if (!user || !user.response.verified)
      return {
        status: httpStatus.BAD_REQUEST,
        response: "User not yet verified",
      };

   const data = {
    email: user.response.email,
    role: user.response.role,
    id: user.response.id,
    name: user.response.name
   }


    return {
      status: httpStatus.OK,
      response: {
        token: generateToken(data),
        data,
      }
    }
  } catch (error) {
    console.log("error", error)
    return {
      response: error,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

const forgotPassword = async (email: string) => {

  
  const user = await userService.getUserByEmail(email);

  if (!user?.response.email)
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

    await mailer.sendEmail(mailOptions);
    const otp = await checkOtp(email)
    if(otp?.otp) {
      const filter = {email}
      const update = {otp: generatedNumber}
      const updateOtp = await Otp.findOneAndUpdate(filter, update)
      if(updateOtp){
        return {
          status: httpStatus.OK,
          response: `We send an otp in your email ${email}`
        }
      }

      return {
        status: httpStatus.BAD_REQUEST,
        response: 'Something wrong in our end'
      }
    }else{
      const createotp = await Otp.create({
        otp: generatedNumber,
        expiration: generator.expiration(),
        email,
      })
      if(createotp){
        return {
          status: httpStatus.OK,
          response: `We send an otp in your email ${email}`
        }
      }
      return {
        status: httpStatus.BAD_REQUEST,
        response: 'Something wrong in our end'
      }
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
    const otp = await checkOtp(email);
    const user = await userService.getUserByEmail(email);

    if (!otp?.otp && user?.response.verified)
      return {
        status: httpStatus.OK,
        response: `Your account is already activated`,
      };
    if (otpRequest !== otp?.otp)
      return {
        status: httpStatus.BAD_REQUEST,
        response: "OTP not match or invalid",
      };

    if (otp && moment(generator.currentDate).isAfter(moment(otp?.expiration)))
      return {
        status: httpStatus.BAD_REQUEST,
        response: "OTP is expired",
      };

    const successUpdate = await Users.findOneAndUpdate({email}, {verified: true});

    if (successUpdate) {
      const deleteOtp = await Otp.deleteOne({email});
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
    const otp = await checkOtp(email);

    if (otpRequest !== otp?.otp)
      return {
        status: httpStatus.BAD_REQUEST,
        response: "OTP not match or invalid",
      };

    if (otp && moment(generator.currentDate).isAfter(moment(otp?.expiration)))
      return {
        status: httpStatus.BAD_REQUEST,
        response: "OTP is expired",
      };

    const successUpdate = await Users.findOneAndUpdate({email},{
        password: await encryptPassword(newpassword),
      },
    );
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
  checkOtp,
  activateUser,
  changePassword,
};
