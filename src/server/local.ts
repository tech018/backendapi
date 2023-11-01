import express from "express";
import bootstrap from "./bootstrap";
import config from "../config";
const application: express.Application = express();
bootstrap(application);

application.listen(config.port, async (): Promise<void> => {
  const message = `Server Started at port ${config.port}`;
  console.log(message);
});
