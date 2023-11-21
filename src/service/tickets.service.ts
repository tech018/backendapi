import httpStatus from "http-status";
import { ITickets, Tickets } from "../models/ticket.model";
import { Types } from "mongoose";

const createTicket = async ({
  name,
  assignee,
  reporter,
  prioLevel,
  descriptions,
  attachments,
}: ITickets) => {
  try {
    const tickets = await Tickets.create({
      name,
      assignee,
      reporter,
      prioLevel,
      descriptions,
      attachments,
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

export const getTickets = async (clientId: Types.ObjectId) => {
  try {
    const tickets = await Tickets.find({ clientId });
    if (tickets.length > 0) {
      return {
        status: httpStatus.OK,
        response: tickets,
      };
    } else {
      return {
        status: httpStatus.NOT_FOUND,
        response: "Empty tickets",
      };
    }
  } catch (error) {
    console.log("error in get tickets", error);
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: `Internal server error`,
    };
  }
};

const deleteTicket = async (ticketIds: Array<string>) => {
  try {
    const tickets = await Tickets.deleteMany({ _id: { $in: ticketIds } });
    if (tickets)
      return {
        status: httpStatus.OK,
        response: `Successfully delete`,
      };
    return {
      status: httpStatus.BAD_REQUEST,
      response: "unable to delete",
    };
  } catch (error) {
    console.log("error delete ticket", error);
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: "Internal server errir",
    };
  }
};

const updateTicket = async (
  ticketId: Types.ObjectId,
  key: keyof ITickets,
  value: string | number
) => {
  try {
    const ticket = await Tickets.findOneAndUpdate(
      { _id: ticketId },
      { [key]: value }
    );
    if (ticket)
      return {
        status: httpStatus.OK,
        response: `Successfully updated ${key} with a ${value}`,
      };

    return {
      status: httpStatus.BAD_REQUEST,
      response: `Unable to update ${key} with a ${value}`,
    };
  } catch (error) {
    console.log("error update ticket", error);
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: `Internal server error`,
    };
  }
};

export default {
  createTicket,
  getTickets,
  deleteTicket,
  updateTicket,
};
