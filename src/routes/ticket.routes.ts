import express from "express";
import { createValidator } from "express-joi-validation";
import ticketsModule from "../modules/tickets.module";
import {
  createTicketSchema,
  getTicketSchema,
  deleteTicketSchema,
} from "../schema/ticket/ticket.schema.validation";

const validator = createValidator();
const router = express.Router();

router
  .route("/create")
  .post(validator.body(createTicketSchema), ticketsModule.createTicket);

router
  .route("/gettickets")
  .get(validator.query(getTicketSchema), ticketsModule.getTicket);

router
  .route("/delete")
  .post(validator.body(deleteTicketSchema), ticketsModule.deleteTicket);

export default router;
