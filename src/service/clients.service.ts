import { Client } from "@prisma/client";
import prisma from "../config/client";
import { ClientID, IClient } from "../types/client";
import httpStatus from "http-status";
import mailer from "../utils/mailer";

const createClient = async ({
  name,
  address,
  contact_number,
  email,
  logo,
}: IClient) => {
  try {
    const client = await checkClientEmail(email);
    if (client?.email !== undefined)
      return {
        status: httpStatus.BAD_REQUEST,
        response: "client email is already exist",
      };

    const create = await prisma.client.create({
      data: {
        name,
        email,
        address,
        contact_number,
        logo,
      },
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

const checkClientEmail = async (email: string): Promise<Client | null> => {
  const query = await prisma.client.findUnique({
    where: {
      email,
    },
  });

  if (query) return query;

  return null;
};

const checkClientId = async (clientId: number): Promise<Client | null> => {
  const query = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });

  if (query) return query;

  return null;
};
const updateClient = async (
  clientId: number,
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
    const client = await prisma.client.update({
      where: { id: clientId },
      data: {
        name,
        email,
        address,
        contact_number,
        logo,
      },
    });
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
  clientId: number,
  key: keyof Client,
  value: string
) => {
  try {
    const checkclientid = await checkClientId(clientId);
    if (checkclientid === null)
      return {
        response: `Cannot find client id`,
        status: httpStatus.NOT_FOUND,
      };
    const client = await prisma.client.update({
      where: { id: clientId },
      data: {
        [key]: value,
      },
    });
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

const deleteClient = async (clientId: number) => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    if (client) {
      const deleted = await prisma.client.delete({
        where: {
          id: clientId,
        },
      });
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
    const clients = await prisma.client.findMany();
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
