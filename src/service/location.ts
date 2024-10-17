import { prisma } from "../utils/prismaClient";

const createLocation = async (
  id: string,
  location: string,
  description: string,
  start_date_time: string,
  end_date_time: string,
  trip_id: string
) => {
  const newLocation = await prisma.location.create({
    data: {
      id,
      location,
      description,
      start_date_time,
      end_date_time,
      trip: {
        connect: {
          id: trip_id,
        },
      },
    },
  });
};

const deleteLocation = async (locationId: string) => {
  const deleteLocation = await prisma.location.delete({
    where: {
      id: locationId,
    },
  });
};

const getLocationByTripId = async (tripId: string) => {
  const locationList = await prisma.location.findMany({
    where: {
      trip_id: tripId,
    },
  });
  return locationList;
};

export default {
  createLocation,
  deleteLocation,
  getLocationByTripId,
};
