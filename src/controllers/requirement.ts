import { Request, Response } from "express";
import requirementServices from "../service/requirement";

export const createRequirement = async (req: Request, res: Response) => {
  const newRequirement = req.body;
  const requirement = newRequirement.requirement;
  const userId = newRequirement.userId;
  const memberList: string[] = [];
  newRequirement.requirement.memberList.map((member) => {
    memberList.push(member);
  });

  try {
    await requirementServices.createRequirement(
      requirement.startDate,
      requirement.endDate,
      requirement.city,
      requirement.arrivalLocation,
      requirement.departureLocation,
      requirement.roomType,
      requirement.breakfast,
      requirement.description,
      userId,
      memberList
    );
    res.status(201).send("Requirement Created");
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
};

export const getAllRequirements = async (req: Request, res: Response) => {
  try {
    const requirements = await requirementServices.getAllRequirements();
    res.status(200).json(requirements);
  } catch (error) {
    res.status(404).send(error);
  }
}

export const getRequirementByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const requirements = await requirementServices.getAllRequirementsByUserId(userId);
    res.status(200).json(requirements);
  } catch (error) {
    res.status(404).send(error);
  }
}

export const getRequirementById = async (req: Request, res: Response) => {
  const requirementId = req.params.id;
  try {
    const requirement = await requirementServices.getRequirementById(requirementId);
    res.status(200).json(requirement);
  } catch (error) {
    res.status(404).send("erroradsfasfasdfasdfa");
  }
}
