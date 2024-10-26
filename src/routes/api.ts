import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  login,
  myProfile,
  refreshToken,
  register,
} from "../controllers/userAuth";
import { createUser, editUser, getUser } from "../controllers/user";
import {
  createMember,
  getAllUserMembers,
  deleteMemberById,
  getMemberById,
  getMembersByRequirementId,
} from "../controllers/member";
import {
  createRequirement,
  getAllRequirements,
  getRequirementByUserId,
  getRequirementById,
} from "../controllers/requirement";
import {
  getTripByRequirementId,
  editTrip,
  getTripByTripId,
  patchTrip
} from "../controllers/trip";
import {
  createLocation,
  deleteLocation,
  getLocationByTripId,
} from "../controllers/location";
import {
  createInvoice,
  editInvoice,
  getInvoice,
  deleteInvoice,
  getInvoiceByTripId
} from "../controllers/invoice";

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

  //Trips
  api.get("/user/requirement/trip/:id", getTripByRequirementId);
  api.get("/user/trip/:id", getTripByTripId);
  api.put("/user/trip/:id", editTrip);
  api.patch("/user/trip/:id", patchTrip);

  //Locations
  api.post("/admin/trip/location/:id", createLocation);
  api.delete("/admin/trip/location/:id", deleteLocation);
  api.get("/admin/trip/location-list/:id", getLocationByTripId);

  //Invoices
  api.get("/user/invoice/:id", getInvoice);
  api.get("/user/invoice/trip/:id", getInvoiceByTripId);
  api.post("/user/invoice", createInvoice);
  api.put("/user/invoice/edit/:id", editInvoice);
  api.delete("/user/invoice/:id", deleteInvoice);

  return api;
};

export default apiRouter;
