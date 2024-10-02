import { Request, Response } from "express";
import memberServices from "../service/member";

export const createMember = async (req: Request, res: Response) => {
  const newMember = req.body.newMember;
  const userId = req.body.userId;

  console.log("Member ", newMember);
  console.log("User Id", userId);

  try {
    await memberServices.createMember(
      newMember.id,
      newMember.name,
      newMember.gender,
      newMember.age,
      newMember.allergy,
      newMember.dietary,
      userId
    );
    res.status(201).send("Member Created");
  } catch (error) {
    res.status(401).send("Not Created");
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  const memberId = req.params.id;
  try {
    const member = await memberServices.getMemberById(memberId);
    res.status(200).json(member);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const getAllUserMembers = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const memberList = await memberServices.getAllUserMembers(userId);
    res.status(200).json(memberList);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const getMembersByRequirementId = async (req: Request, res: Response) => {
  const requirementId = req.params.id;
  try {
    const memberList = await memberServices.getMembersByRequirementId(requirementId);

    const memberListData = await Promise.all(
      memberList.map(async (member) => {
      return await memberServices.getMemberById(member.member_id);
      })
    );
    res.status(200).json(memberListData);
  } catch (error) {
    res.status(401).send(error);
  }
}

export const deleteMemberById = async (req: Request, res: Response) => {
  const memberId = req.params.id;
  try {
    await memberServices.deleteMemberById(memberId);
    res.status(200).send("Member Delete Successfully");
  } catch (error) {
    res.status(400).send("Failed to Delete Member");
  }
};
