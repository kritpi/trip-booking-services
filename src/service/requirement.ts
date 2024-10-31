import { prisma } from "../utils/prismaClient";

const createRequirement = async (
  //Write requirement data to requirement table
  id: string,
  start_date_time: string,
  end_date_time: string,
  city: string,
  arrival_location: string,
  departure_location: string,
  room_type: string,
  breakfast_included: boolean,
  trip_description: string,
  owner_id: string,
  member_list: string[]
) => {
  const requirement = await prisma.requirement.create({
    data: {
      id,
      start_date_time,
      end_date_time,
      city,
      arrival_location,
      departure_location,
      room_type,
      breakfast_included,
      trip_description,
      owner: {
        connect: {
          id: owner_id,
        },
      },
    },
  });
  //write member list of the requirement to requirementMember table
  const memberList = await prisma.requirementMember.createMany({
    data: member_list.map((memberId) => {
      return {
        member_id: memberId,
        requirement_id: requirement.id,
      };
    }),
  });
};

const getAllRequirements = async () => {
  const requirements = await prisma.requirement.findMany({
    include: {
      requirementMember: {
        include: {
          member: true, // Assuming 'member' is the relation name in requirementMember model
        },
      },
      trip: {
        select: {
          status: true, // Ensure 'status' is selected from the trip relation
        },
      },
      owner: {
        select: {
          username: true, // Ensure 'username' is selected from the owner relation
        },
      },
    },
  });

  const formattedRequirements = requirements.map((requirement) => ({
    requirement: {
      id: requirement.id,
      start_date_time: requirement.start_date_time,
      end_date_time: requirement.end_date_time,
      city: requirement.city,
      arrival_location: requirement.arrival_location,
      departure_location: requirement.departure_location,
      room_type: requirement.room_type,
      breakfast_included: requirement.breakfast_included,
      trip_description: requirement.trip_description,
      owner_id: requirement.owner_id,
      create_at: requirement.create_at,
      status: requirement.trip?.[0]?.status,
      owner: requirement.owner?.username,
    },
    memberList: requirement.requirementMember.map((member) => member.member),
  }));

  return formattedRequirements;
};

const getAllRequirementsByUserId = async (userId: string) => {
  const requirements = await prisma.requirement.findMany({
    where: {
      owner_id: userId,
    },
    include: {
      requirementMember: true,
      trip: {
        select: {
          status: true, // Ensure 'status' is selected from the trip relation
        },
      },
    },
  });

  const formattedRequirements = requirements.map((requirement) => ({
    requirement: {
      id: requirement.id,
      start_date_time: requirement.start_date_time,
      end_date_time: requirement.end_date_time,
      city: requirement.city,
      arrival_location: requirement.arrival_location,
      departure_location: requirement.departure_location,
      room_type: requirement.room_type,
      breakfast_included: requirement.breakfast_included,
      trip_description: requirement.trip_description,
      owner_id: requirement.owner_id,
      status: requirement.trip?.[0]?.status,
    },
    memberList: requirement.requirementMember.map((member) => member.member_id),
  }));

  return formattedRequirements;
};

const getRequirementById = async (requirementId: string) => {
  const requirement = await prisma.requirement.findUnique({
    where: {
      id: requirementId,
    },
    include: {
      requirementMember: {
        include: {
          member: true, // Assuming 'member' is the relation name in requirementMember model
        },
      },
    },
  });

  const formattedRequirements = {
    requirement: {
      id: requirement.id,
      start_date_time: requirement.start_date_time,
      end_date_time: requirement.end_date_time,
      city: requirement.city,
      arrival_location: requirement.arrival_location,
      departure_location: requirement.departure_location,
      room_type: requirement.room_type,
      breakfast_included: requirement.breakfast_included,
      trip_description: requirement.trip_description,
      owner_id: requirement.owner_id,
      create_at: requirement.create_at,
    },
    memberList: requirement.requirementMember.map((member) => member.member),
  };

  return formattedRequirements;
};

export default {
  createRequirement,
  getAllRequirements,
  getAllRequirementsByUserId,
  getRequirementById,
};
