import express from "express";
import bootstrap from "./bootstrap";
import config from "../config";
import mongoConnect from "../config/mongo";
const application: express.Application = express();
bootstrap(application);

application.listen(config.port, async (): Promise<void> => {
  await mongoConnect();
  const message = `Server Started at port ${config.port}`;
  console.log(message);
});
