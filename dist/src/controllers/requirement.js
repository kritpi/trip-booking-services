"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequirementById = exports.getRequirementByUserId = exports.getAllRequirements = exports.createRequirement = void 0;
const requirement_1 = __importDefault(require("../service/requirement"));
const trip_1 = __importDefault(require("../service/trip"));
const createRequirement = async (req, res) => {
    const newRequirement = req.body;
    const requirement = newRequirement.requirement;
    const userId = newRequirement.userId;
    const memberList = [];
    newRequirement.requirement.memberList.map((member) => {
        memberList.push(member);
    });
    console.log(typeof (requirement.uuid));
    try {
        await requirement_1.default.createRequirement(requirement.uuid, requirement.startDate, requirement.endDate, requirement.city, requirement.arrivalLocation, requirement.departureLocation, requirement.roomType, requirement.breakfast, requirement.description, userId, memberList);
        await trip_1.default.createTrip(requirement.startDate, requirement.endDate, "", "", "", requirement.memberList.length, "", "", requirement.breakfast, 0.0, "Creating tour", "", requirement.uuid);
        res.status(201).send("Requirement Created");
    }
    catch (error) {
        res.status(401).send(error);
        res.send("Fail");
        console.log(error);
    }
};
exports.createRequirement = createRequirement;
const getAllRequirements = async (req, res) => {
    try {
        const requirements = await requirement_1.default.getAllRequirements();
        res.status(200).json(requirements);
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.getAllRequirements = getAllRequirements;
const getRequirementByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const requirements = await requirement_1.default.getAllRequirementsByUserId(userId);
        res.status(200).json(requirements);
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.getRequirementByUserId = getRequirementByUserId;
const getRequirementById = async (req, res) => {
    const requirementId = req.params.id;
    try {
        const requirement = await requirement_1.default.getRequirementById(requirementId);
        res.status(200).json(requirement);
    }
    catch (error) {
        res.status(404).send("erroradsfasfasdfasdfa");
    }
};
exports.getRequirementById = getRequirementById;
//# sourceMappingURL=requirement.js.map