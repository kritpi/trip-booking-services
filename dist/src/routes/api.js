"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userAuth_1 = require("../controllers/userAuth");
const user_1 = require("../controllers/user");
const member_1 = require("../controllers/member");
const requirement_1 = require("../controllers/requirement");
const trip_1 = require("../controllers/trip");
const location_1 = require("../controllers/location");
const invoice_1 = require("../controllers/invoice");
const apiRouter = () => {
    const api = (0, express_1.Router)();
    //Authentications
    api.get("/auth/profile", authMiddleware_1.default, userAuth_1.myProfile);
    api.post("/auth/login", userAuth_1.login);
    api.post("/auth/refresh", userAuth_1.refreshToken);
    api.post("/auth/register", userAuth_1.register);
    //Users
    api.post("/user/sign-up", user_1.createUser);
    api.get("/user/:id", user_1.getUser);
    api.put("/user/:id", user_1.editUser);
    //Members
    api.get("/user/member/:id", member_1.getAllUserMembers);
    api.post("/user/member", member_1.createMember);
    api.delete("/user/member/:id", member_1.deleteMemberById);
    api.get("/user/member/:id", member_1.getMemberById);
    api.get("/user/member/requirement/:id", member_1.getMembersByRequirementId);
    //Requirements
    api.post("/user/requirement", requirement_1.createRequirement);
    api.get("/user/requirement/user/:id", requirement_1.getRequirementByUserId);
    api.get("/user/requirement/:id", requirement_1.getRequirementById);
    api.get("/admin/requirements", requirement_1.getAllRequirements);
    //Trips
    api.get("/user/requirement/trip/:id", trip_1.getTripByRequirementId);
    api.get("/user/trip/:id", trip_1.getTripByTripId);
    api.put("/user/trip/:id", trip_1.editTrip);
    api.patch("/user/trip/:id", trip_1.patchTrip);
    //Locations
    api.post("/admin/trip/location/:id", location_1.createLocation);
    api.delete("/admin/trip/location/:id", location_1.deleteLocation);
    api.get("/admin/trip/location-list/:id", location_1.getLocationByTripId);
    //Invoices
    api.get("/user/invoice/:id", invoice_1.getInvoice);
    api.get("/user/invoice/trip/:id", invoice_1.getInvoiceByTripId);
    api.post("/user/invoice", invoice_1.createInvoice);
    api.put("/user/invoice/edit/:id", invoice_1.editInvoice);
    api.delete("/user/invoice/:id", invoice_1.deleteInvoice);
    return api;
};
exports.default = apiRouter;
//# sourceMappingURL=api.js.map