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

export interface selectedId {
  _id: Types.ObjectId;
}

const deleteTicket = async (ticketIds: Array<selectedId>) => {
  try {
    const tickets = await Tickets.deleteMany(ticketIds);
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
    console.log("error delete ticket");
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: "Internal server errir",
    };
  }
};

export default {
  createTicket,
  getTickets,
  deleteTicket,
};
