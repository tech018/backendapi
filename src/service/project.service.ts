import httpStatus from "http-status";
import { IProject, Project } from "../models/project.model";

export const createProject = async ({
  clientId,
  name,
  collaborator,
  budget,
  details,
  type,
}: IProject) => {
  try {
    const newproject = await Project.create({
      clientId,
      name,
      collaborator,
      budget,
      details,
      type,
    });
    if (newproject)
      return {
        status: httpStatus.OK,
        response: `Successfully added ${name} into your project`,
      };
    return {
      status: httpStatus.NOT_ACCEPTABLE,
      response: "Something wrong in our end",
    };
  } catch (error) {
    console.log("error create project", error);
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      response: "Internal server error",
    };
  }
};

export default { createProject };
