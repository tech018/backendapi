import express from "express";
import { createValidator } from "express-joi-validation";
import clientValidation from "../schema/clients/clients.schema.validation";
import clientsModule from "../modules/clients.module";
const validator = createValidator();
const router = express.Router();

router.route("/getall").get(clientsModule.allClients);

router
  .route("/create")
  .post(
    validator.body(clientValidation.clientSchema),
    clientsModule.createClient
  );

router
  .route("/update")
  .put(
    validator.body(clientValidation.clientUpdateSchema),
    clientsModule.updateClient
  );

router
  .route("/delete")
  .delete(
    validator.query(clientValidation.clientDeleteSchema),
    clientsModule.deleteClient
  );

export default router;
