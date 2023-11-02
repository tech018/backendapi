import { Client } from "@prisma/client";
import prisma from "../config/client";
import { IClient } from "../types/client";
import httpStatus from "http-status";

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

export default {
  checkClientEmail,
  createClient,
  updateClient,
  checkClientId,
};
