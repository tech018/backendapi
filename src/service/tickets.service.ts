import httpStatus from "http-status";
import { ITickets, Tickets } from "../models/ticket.model";

const createTicket = async ({
  name,
  assignee,
  reporter,
  prioLevel,
  descriptions,
  attachments,
  clientId,
}: ITickets) => {
  try {
    const tickets = await Tickets.create({
      name,
      assignee,
      reporter,
      prioLevel,
      descriptions,
      attachments,
      clientId,
    });
    if (tickets)
      return {
        status: httpStatus.CREATED,
        response: `Successfully created ${name}`,
      };

    return {
      status: httpStatus.BAD_REQUEST,
      response: `Unable to create record from ${name}`,
    };
  } catch (error) {
    console.log("error create ticket", error);
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: `Internal server error`,
    };
  }
};

export const getTickets = async () => {};

export default {
  createTicket,
};
