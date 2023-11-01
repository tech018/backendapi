import httpStatus, { NOT_FOUND } from "http-status";
import { Request, Response } from "express";
import userService from "../service/user.service";
import { ValidatedRequest } from "express-joi-validation";
import {
  createUserRequestSchema,
  getUserRequestSchema,
} from "../schema/users/user.interface.request";

const createUser = async (
  req: ValidatedRequest<createUserRequestSchema>,
  res: Response
) => {
  try {
    const { email, password, name, role } = req.body;

    const user = await userService.createUser(email, password, name, role);

    if (user) return res.status(httpStatus.CREATED).json(user);
    return res.status(httpStatus.BAD_REQUEST).json({
      message: `Cannot create an account using this email ${email} because is already been taken`,
    });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
};

const queryUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.queryUsers();

    if (users)
      return res.status(httpStatus.OK).json(
        users.map((datum) => {
          return {
            id: datum.id,
            name: datum.name,
            email: datum.email,
            role: datum.role,
          };
        })
      );
    return res.status(httpStatus.NOT_FOUND).json({ message: "Query is empty" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getUser = async (
  req: ValidatedRequest<getUserRequestSchema>,
  res: Response
) => {
  try {
    const { userId } = req.query;
    const user = await userService.getUserById(userId);
    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found", status: httpStatus.NOT_FOUND });
    return res.status(httpStatus.OK).json({
      email: user.email,
      name: user.name,
      role: user.role,
      id: user.id,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

export default {
  createUser,
  getUser,
  queryUsers,
};
