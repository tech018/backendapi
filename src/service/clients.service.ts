import httpStatus from "http-status";
import { IClient } from "../types/client";
import { Client } from "../models/client.model";

const createClient = async ({
  name,
  address,
  contact_number,
  email,
  logo,
  projectType,
}: IClient) => {
  try {
    const client = await checkClientEmail(email);
    if (client?.email !== undefined)
      return {
        status: httpStatus.BAD_REQUEST,
        response: "client email is already exist",
      };

    const create = await Client.create({
      name,
      email,
      address,
      contact_number,
      logo,
      projectType,
    });
    if (create)
      return {
        status: httpStatus.OK,
        response: `Successfully create client ${name}`,
      };
  } catch (error) {
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: `Internal server error ${error}`,
    };
  }
};

const checkClientEmail = async (email: string): Promise<IClient | null> => {
  const query = await Client.findOne({ email });

  if (query) return query;

  return null;
};

const checkClientId = async (clientId: string): Promise<IClient | null> => {
  const query = await Client.findById(clientId);

  if (query) return query;

  return null;
};
const updateClient = async (
  clientId: string,
  name: string,
  email: string,
  address: string,
  contact_number: string,
  logo: string
) => {
  try {
    const checkclientid = await checkClientId(clientId);
    if (checkclientid === null)
      return {
        response: `Cannot find client id`,
        status: httpStatus.NOT_FOUND,
      };
    const client = await Client.findOneAndUpdate(
      { _id: clientId },
      {
        name,
        email,
        address,
        contact_number,
        logo,
      }
    );
    if (client)
      return {
        status: httpStatus.OK,
        response: `Successfully update ${name}`,
      };
    return {
      status: httpStatus.BAD_REQUEST,
      response: `There is a something wrong in our end`,
    };
  } catch (error) {
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: `Error updating client", ${error}`,
    };
  }
};

const updateClientSingle = async (
  clientId: string,
  key: keyof IClient,
  value: string
) => {
  try {
    const checkclientid = await checkClientId(clientId);
    if (checkclientid === null)
      return {
        response: `Cannot find client id`,
        status: httpStatus.NOT_FOUND,
      };
    const client = await Client.findOneAndUpdate(
      { id: clientId },
      {
        [key]: value,
      }
    );
    if (client)
      return {
        status: httpStatus.OK,
        response: `Successfully update ${key}-${value}`,
      };
    return {
      status: httpStatus.BAD_REQUEST,
      response: `There is a something wrong in our end`,
    };
  } catch (error) {
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: `Error updating client", ${error}`,
    };
  }
};

const deleteClient = async (clientId: string) => {
  try {
    const client = await Client.findById(clientId);

    if (client) {
      const deleted = await Client.findByIdAndDelete(client._id);
      if (deleted)
        return {
          response: `Successfully deleted ${client.name}`,
          status: httpStatus.OK,
        };
      return {
        response: `Cannot delete ${client.name}`,
        status: httpStatus.BAD_REQUEST,
      };
    } else {
      return {
        response: `client not found`,
        status: httpStatus.NOT_FOUND,
      };
    }
  } catch (error) {
    return {
      response: `Internal server error`,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

const allClients = async () => {
  try {
    const clients = await Client.find();
    if (clients.length > 0) {
      return {
        response: clients,
        status: httpStatus.OK,
      };
    } else {
      return {
        response: [],
        status: httpStatus.OK,
      };
    }
  } catch (error) {
    return {
      response: `Internal server error ${error}`,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

export default {
  checkClientEmail,
  createClient,
  updateClientSingle,
  updateClient,
  checkClientId,
  deleteClient,
  allClients,
};
