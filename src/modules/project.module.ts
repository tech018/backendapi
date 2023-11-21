import { ValidatedRequest } from "express-joi-validation";
import { createProjectRequestSchema } from "../schema/project/project.interface.request";
import { Response } from "express";
import { Project } from "../models/project.model";
import projectService from "../service/project.service";

const createProject = async (
  req: ValidatedRequest<createProjectRequestSchema>,
  res: Response
) => {
  const { clientId, name, collaborator, budget, details, type } = req.body;
  const data = await projectService.createProject({
    clientId,
    name,
    collaborator,
    budget,
    details,
    type,
  });
  if (data) res.status(data.status).json(data.response);
};

export default {
  createProject,
};
