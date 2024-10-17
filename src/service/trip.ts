import { prisma } from "../utils/prismaClient";

const createTrip = async (
  start_date_time: string,
  end_date_time: string,
  city: string,
  arrival_location: string,
  departure_location: string,
  members: number,
  hotel: string,
  room_type: string,
  breakfast_included: boolean,
  price: number,
  status: string,
  comment: string,
  requirement_id: string,
) => {
  const newTrip = await prisma.trip.create({
    data: {
      start_date_time,
      end_date_time,
      city,
      arrival_location,
      departure_location,
      members,
      hotel,
      room_type,
      breakfast_included,
      price,
      status,
      comment, 
      requirement: {
        connect: {
          id: requirement_id,
        },
      },
    },
  });
};

const getTripByTripId = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    }
  })
  return trip;
}

const getTripByRequirementId = async (requirement_id: string) => {
  const trip = await prisma.trip.findFirst({
    where: {
      requirement_id: requirement_id,
    },
  });
  return trip;
};

const editTrip = async (tripId: string, editTrip: any) => {
  console.log("DB", tripId);
  console.log("DB", editTrip);  
  const updatedTrip = await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: {
      start_date_time: editTrip.start_date_time,
      end_date_time: editTrip.end_date_time,
      city: editTrip.city,
      arrival_location: editTrip.arrivalLocation,
      departure_location: editTrip.departureLocation,
      members: editTrip.members,
      hotel: editTrip.hotel,
      room_type: editTrip.room_type,
      breakfast_included: editTrip.breakfast_included,
      price: editTrip.price,
      status: editTrip.status,
      comment: editTrip.comment,
    },
  });
};

export default {  
  createTrip,
  getTripByTripId,
  getTripByRequirementId,
  editTrip,
};
