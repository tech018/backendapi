import express from "express";
import parser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import config from "../config";

import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import uploadRoutes from "../routes/uploader.routes";
import clientRoutes from "../routes/client.routes";

const bootstrap = (application: express.Application): void => {
  application.disable("x-powered-by");
  application.use(express.static(__dirname + "/files"));
  application.use(cors());
  application.use(cors({ optionsSuccessStatus: 200 }));
  application.use(parser.urlencoded({ extended: true }));
  application.use(parser.json());
  application.use(helmet());
  application.use(morgan(config.env === "development" ? "dev" : config.env));
  application.use("/api/user", userRoutes);
  application.use("/api/auth", authRoutes);
  application.use("/files", express.static("files"));
  application.use("/api/upload", uploadRoutes);
  application.use("/api/client", clientRoutes);
};

export default bootstrap;
