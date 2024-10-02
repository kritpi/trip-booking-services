import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  login,
  myProfile,
  refreshToken,
  register,
} from "../controllers/userAuth";
import { createUser, editUser, getUser } from "../controllers/user";
import { createMember, getAllUserMembers, deleteMemberById, getMemberById, getMembersByRequirementId } from "../controllers/member";
import { createRequirement, getAllRequirements, getRequirementByUserId, getRequirementById } from "../controllers/requirement";

const apiRouter = (): Router => {
  const api = Router();

  //Authentications
  api.get("/auth/profile", authMiddleware, myProfile);
  api.post("/auth/login", login);
  api.post("/auth/refresh", refreshToken);
  api.post("/auth/register", register);

  //Users
  api.post("/user/sign-up", createUser);
  api.get("/user/:id", getUser);
  api.put("/user/:id", editUser);

  //Members
  api.get("/user/member/:id", getAllUserMembers);
  api.post("/user/member", createMember);
  api.delete("/user/member/:id", deleteMemberById); 
  api.get("/user/member/:id", getMemberById);
  api.get("/user/member/requirement/:id", getMembersByRequirementId);

  //Requirements
  api.post("/user/requirement", createRequirement);
  api.get("/user/requirement/user/:id", getRequirementByUserId);
  api.get("/user/requirement/:id", getRequirementById);
  api.get("/admin/requirements", getAllRequirements);

  return api;
};

export default apiRouter;
