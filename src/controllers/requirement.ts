import { Request, Response } from "express";
import requirementServices from "../service/requirement";
import tripServices from "../service/trip";
import invoiceServices from "../service/invoice"

export const createRequirement = async (req: Request, res: Response) => {
  const newRequirement = req.body;
  const requirement = newRequirement.requirement;
  const userId = newRequirement.userId;
  const memberList: string[] = [];
  newRequirement.requirement.memberList.map((member) => {
    memberList.push(member);
  });
  console.log(typeof(requirement.uuid));
  
  try {
    await requirementServices.createRequirement(
      requirement.uuid,
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
    await tripServices.createTrip(
      requirement.startDate,
      requirement.endDate,
      "",
      "",
      "",
      requirement.memberList.length,
      "",
      "",
      requirement.breakfast,
      0.0,
      "Creating tour",
      "",
      requirement.uuid      
    );
    res.status(201).send("Requirement Created");
  } catch (error) {
    res.status(401).send(error);
    res.send("Fail")
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
