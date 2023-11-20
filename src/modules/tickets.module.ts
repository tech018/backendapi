import { ValidatedRequest } from "express-joi-validation";
import { Response } from "express";
import { createTicketRequestSchema } from "../schema/ticket/ticket.interface.request";
import ticketsService from "../service/tickets.service";

const createTicket = async (
  req: ValidatedRequest<createTicketRequestSchema>,
  res: Response
) => {
  const {
    name,
    assignee,
    reporter,
    prioLevel,
    descriptions,
    attachments,
    clientId,
  } = req.body;

  const data = await ticketsService.createTicket({
    name,
    assignee,
    reporter,
    prioLevel,
    descriptions,
    attachments,
    clientId,
  });
  return res.status(data.status).json({ message: data.response });
};

export default {
  createTicket,
};
