import { ValidatedRequest } from "express-joi-validation";
import {
  activateUserSchema,
  forgotPasswordSchema,
  loginUserRequestSchema,
  resetPasswordSchema,
} from "../schema/auth/auth.interface.request";
import authService from "../service/auth.service";
import { Response } from "express";
import httpStatus from "http-status";

const loginUser = async (
  req: ValidatedRequest<loginUserRequestSchema>,
  res: Response
) => {
  try {
    const { password, email } = req.body;
    const data = await authService.loginUser({ email, password });

    if (data?.status === 401 || data?.status === 400)
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: data.response, status: data.status });

    return res
      .status(httpStatus.OK)
      .json({ data: data?.response, status: data?.status });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
};

const forgotPassword = async (
  req: ValidatedRequest<forgotPasswordSchema>,
  res: Response
) => {
  try {
    const { email } = req.query;
    const forgot = await authService.forgotPassword(email);
    if (forgot)
      return res.status(forgot.status).json({ message: forgot.response });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
};

const changePassword = async (
  req: ValidatedRequest<resetPasswordSchema>,
  res: Response
) => {
  try {
    const { newPassword, otp, email } = req.body;

    const data = await authService.changePassword(otp, email, newPassword);
    if (data) return res.status(data.status).json({ message: data.response });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
};

const activateUser = async (
  req: ValidatedRequest<activateUserSchema>,
  res: Response
) => {
  try {
    const { email, otp } = req.query;
    const data = await authService.activateUser(email, otp);
    if (data)
      return res
        .status(data.status)
        .json({ message: data.response, status: data.status });
  } catch (error) {
    console.log("error", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Interna server error` });
  }
};

export default {
  loginUser,
  forgotPassword,
  activateUser,
  changePassword,
};
