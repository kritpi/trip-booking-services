"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemberById = exports.getMembersByRequirementId = exports.getAllUserMembers = exports.getMemberById = exports.createMember = void 0;
const member_1 = __importDefault(require("../service/member"));
const createMember = async (req, res) => {
    const newMember = req.body.newMember;
    const userId = req.body.userId;
    console.log("Member ", newMember);
    console.log("User Id", userId);
    try {
        await member_1.default.createMember(newMember.id, newMember.name, newMember.gender, newMember.age, newMember.allergy, newMember.dietary, userId);
        res.status(201).send("Member Created");
    }
    catch (error) {
        res.status(401).send("Not Created");
    }
};
exports.createMember = createMember;
const getMemberById = async (req, res) => {
    const memberId = req.params.id;
    try {
        const member = await member_1.default.getMemberById(memberId);
        res.status(200).json(member);
    }
    catch (error) {
        res.status(401).send(error);
    }
};
exports.getMemberById = getMemberById;
const getAllUserMembers = async (req, res) => {
    const userId = req.params.id;
    try {
        const memberList = await member_1.default.getAllUserMembers(userId);
        res.status(200).json(memberList);
    }
    catch (error) {
        res.status(401).send(error);
    }
};
exports.getAllUserMembers = getAllUserMembers;
const getMembersByRequirementId = async (req, res) => {
    const requirementId = req.params.id;
    try {
        const memberList = await member_1.default.getMembersByRequirementId(requirementId);
        const memberListData = await Promise.all(memberList.map(async (member) => {
            return await member_1.default.getMemberById(member.member_id);
        }));
        res.status(200).json(memberListData);
    }
    catch (error) {
        res.status(401).send(error);
    }
};
exports.getMembersByRequirementId = getMembersByRequirementId;
const deleteMemberById = async (req, res) => {
    const memberId = req.params.id;
    try {
        await member_1.default.deleteMemberById(memberId);
        res.status(200).send("Member Delete Successfully");
    }
    catch (error) {
        res.status(400).send("Failed to Delete Member");
    }
};
exports.deleteMemberById = deleteMemberById;
//# sourceMappingURL=member.js.map