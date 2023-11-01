import nodemailer from "nodemailer";
import { google } from "googleapis";
import appConfig from "../config";
import { MailOptions } from "../interface/mail";

const sendEmail = async (mailOptions: MailOptions): Promise<void> => {
  const oAuth2Client = new google.auth.OAuth2(
    appConfig.mailerID,
    appConfig.mailerSecret,
    appConfig.mailerUri
  );

  oAuth2Client.setCredentials({ refresh_token: appConfig.mailerToken });
  const accessToken = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: appConfig.mailerService,
    auth: {
      type: appConfig.mailerType,
      user: appConfig.mailer,
      clientId: appConfig.mailerID,
      clientSecret: appConfig.mailerSecret,
      refreshToken: appConfig.mailerToken,
      accessToken: `${accessToken}`,
    },
  });

  await transport.sendMail(mailOptions, (error) => {
    if (error) {
      return console.log("Failed email transport");
    } else {
      return console.log("Success email transferred");
    }
  });
};

export default {
  sendEmail,
};
