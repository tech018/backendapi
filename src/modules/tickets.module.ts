import { ValidatedRequest } from "express-joi-validation";
import { Response } from "express";
import {
  createTicketRequestSchema,
  deleteTicketRequestSchema,
  getTicketRequestSchema,
  updateTicketRequestSchema,
} from "../schema/ticket/ticket.interface.request";
import ticketsService from "../service/tickets.service";

const createTicket = async (
  req: ValidatedRequest<createTicketRequestSchema>,
  res: Response
) => {
  const { name, assignee, reporter, prioLevel, descriptions, attachments } =
    req.body;

  const data = await ticketsService.createTicket({
    name,
    assignee,
    reporter,
    prioLevel,
    descriptions,
    attachments,
  });
  return res.status(data.status).json({ message: data.response });
};

const getTicket = async (
  req: ValidatedRequest<getTicketRequestSchema>,
  res: Response
) => {
  const { clientId } = req.query;
  const data = await ticketsService.getTickets(clientId);
  return res.status(data.status).json({ data: data.response });
};

const deleteTicket = async (
  req: ValidatedRequest<deleteTicketRequestSchema>,
  res: Response
) => {
  const { ticketIds } = req.body;
  const data = await ticketsService.deleteTicket(ticketIds);
  if (data) return res.status(data.status).json({ data: data.response });
};

const updateTicket = async (
  req: ValidatedRequest<updateTicketRequestSchema>,
  res: Response
) => {
  const { ticketId, key, value } = req.body;
  const data = await ticketsService.updateTicket(ticketId, key, value);
  if (data) res.status(data.status).json(data.response);
};

export default {
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
