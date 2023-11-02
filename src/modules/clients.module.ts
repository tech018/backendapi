import { ValidatedRequest } from "express-joi-validation";
import {
  createClientRequestSchema,
  updateClientRequestSchema,
} from "../schema/clients/clients.interface.request";
import { Response } from "express";
import clientsService from "../service/clients.service";
import httpStatus from "http-status";

const createClient = async (
  req: ValidatedRequest<createClientRequestSchema>,
  res: Response
) => {
  try {
    const { email, name, address, contact_number, logo } = req.body;
    const data = await clientsService.createClient({
      name,
      email,
      address,
      contact_number,
      logo,
    });
    if (data) return res.status(data.status).json({ data: data.response });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error ${error}` });
  }
};

const updateClient = async (
  req: ValidatedRequest<updateClientRequestSchema>,
  res: Response
) => {
  try {
    const { key, clientId, value } = req.body;
    const update = await clientsService.updateClient(clientId, key, value);
    if (update)
      return res.status(update.status).json({ data: update.response });
  } catch (error) {
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: `Internal server error ${error}`,
    };
  }
};

export default {
  createClient,
  updateClient,
};
