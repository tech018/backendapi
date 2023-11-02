import moment, { Moment } from "moment";
import { Token, TokenType } from "@prisma/client";
import jwt from "jsonwebtoken";
import config from "../config";
import prisma from "../config/client";
import { AuthTokensResponse } from "../types/response";
import userService from "./user.service";
import httpStatus from "http-status";
import ApiErrorLogger from "../utils/ApiErrorLogger";

const generateToken = (
  userId: number,
  expires: Moment,
  type: TokenType,
  secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().utc().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: number,
  expires: Moment,
  type: TokenType,
  blacklisted = false
): Promise<Token> => {
  const createdToken = prisma.token.create({
    data: {
      token,
      userId: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  });
  return createdToken;
};

const generateAuthTokens = async (user: {
  id: number;
}): Promise<AuthTokensResponse> => {
  const accessTokenExpires = moment()
    .utc()
    .add(config.jwt.expirationMinutes, "minutes");
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    TokenType.ACCESS
  );

  const refreshTokenExpires = moment()
    .utc()
    .add(config.jwt.expirationDays, "days");
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    TokenType.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    TokenType.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.checkEmail(email);
  if (!user) {
    throw new ApiErrorLogger(
      httpStatus.NOT_FOUND,
      "No users found with this email"
    );
  }
  const expires = moment()
    .utc()
    .add(config.jwt.expirationPassMinutes, "minutes");
  const resetPasswordToken = generateToken(
    user.id as number,
    expires,
    TokenType.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id as number,
    expires,
    TokenType.RESET_PASSWORD
  );
  return resetPasswordToken;
};

const generateVerifyEmailToken = async (user: {
  id: number;
}): Promise<string> => {
  const expires = moment()
    .utc()
    .add(config.jwt.expirationEmailMinutes, "minutes");
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    TokenType.VERIFY_EMAIL
  );
  await saveToken(verifyEmailToken, user.id, expires, TokenType.VERIFY_EMAIL);
  return verifyEmailToken;
};

export default {
  generateToken,
  saveToken,
  generateAuthTokens,
  generateVerifyEmailToken,
  generateResetPasswordToken,
};
