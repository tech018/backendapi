import express from "express";
import { createValidator } from "express-joi-validation";
import ticketsModule from "../modules/tickets.module";
import { createTicketSchema } from "../schema/ticket/ticket.schema.validation";

const validator = createValidator();
const router = express.Router();

router
  .route("/create")
  .post(validator.body(createTicketSchema), ticketsModule.createTicket);

export default router;
