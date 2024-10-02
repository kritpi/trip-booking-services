import { Gender, Member, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMember = async (
  id: string,
  name: string,
  gender: Gender,
  age: string,
  allergy: string,
  dietary: string,
  ownerId: string
) => {
  const member = await prisma.member.create({
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

const getAllUserMembers = async (userId: string) => {
  //Get all member of a user
  const members: Member[] = await prisma.member.findMany({
    where: {
      owner_id: userId,
    },
  });
  return members;
};

const getMemberById = async (memberId: string) => {
  const member = await prisma.member.findUnique({
    where: {
      id: memberId,
    },
  });
  return member;
};

const getMembersByRequirementId = async (requirementId: string) => {
  const members = await prisma.requirementMember.findMany({
    where: {
      requirement_id: requirementId,
    }
  });
  return members;
}

const deleteMemberById = async (memberId: string) => {
  //Delete member by id
  await prisma.member.delete({
    where: {
      id: memberId,
    }
  })
};

export default {
  createMember,
  getMemberById,
  getAllUserMembers,
  getMembersByRequirementId,
  deleteMemberById,
};
