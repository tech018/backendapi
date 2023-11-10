import { ValidatedRequest } from "express-joi-validation";
import {
  createClientRequestSchema,
  deleteClientRequestSchema,
  updateClientRequestSchema,
} from "../schema/clients/clients.interface.request";
import { Response, Request } from "express";
import clientsService from "../service/clients.service";

const createClient = async (
  req: ValidatedRequest<createClientRequestSchema>,
  res: Response
) => {
  const { email, name, address, contact_number, logo } = req.body;
  const data = await clientsService.createClient({
    name,
    email,
    address,
    contact_number,
    logo,
  });
  if (data) return res.status(data.status).json({ data: data.response });
};

const updateClient = async (
  req: ValidatedRequest<updateClientRequestSchema>,
  res: Response
) => {
  const { clientId, name, email, address, contact_number, logo } = req.body;
  const update = await clientsService.updateClient(
    clientId,
    name,
    email,
    address,
    contact_number,
    logo
  );
  if (update) return res.status(update.status).json({ data: update.response });
};

const deleteClient = async (
  req: ValidatedRequest<deleteClientRequestSchema>,
  res: Response
) => {
  const { clientId } = req.query;
  const deleted = await clientsService.deleteClient(clientId);
  if (deleted)
    return res.status(deleted.status).json({ data: deleted.response });
};

const allClients = async (req: Request, res: Response) => {
  const clients = await clientsService.allClients();
  if (clients)
    return res.status(clients.status).json({ data: clients.response });
};

export default {
  createClient,
  updateClient,
  deleteClient,
  allClients,
};
