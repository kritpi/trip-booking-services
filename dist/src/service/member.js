"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../utils/prismaClient");
const createMember = async (id, name, gender, age, allergy, dietary, ownerId) => {
    const member = await prismaClient_1.prisma.member.create({
        data: {
            id,
            name,
            gender,
            age,
            allergy,
            dietary,
            requirementMember: {},
            owner: {
                connect: {
                    id: ownerId,
                },
            },
        },
    });
    return member;
};
const getAllUserMembers = async (userId) => {
    //Get all member of a user
    const members = await prismaClient_1.prisma.member.findMany({
        where: {
            owner_id: userId,
        },
    });
    return members;
};
const getMemberById = async (memberId) => {
    const member = await prismaClient_1.prisma.member.findUnique({
        where: {
            id: memberId,
        },
    });
    return member;
};
const getMembersByRequirementId = async (requirementId) => {
    const members = await prismaClient_1.prisma.requirementMember.findMany({
        where: {
            requirement_id: requirementId,
        }
    });
    return members;
};
const deleteMemberById = async (memberId) => {
    //Delete member by id
    await prismaClient_1.prisma.member.delete({
        where: {
            id: memberId,
        }
    });
};
exports.default = {
    createMember,
    getMemberById,
    getAllUserMembers,
    getMembersByRequirementId,
    deleteMemberById,
};
//# sourceMappingURL=member.js.map