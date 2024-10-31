"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../utils/prismaClient");
const createTrip = async (start_date_time, end_date_time, city, arrival_location, departure_location, members, hotel, room_type, breakfast_included, price, status, comment, requirement_id) => {
    const newTrip = await prismaClient_1.prisma.trip.create({
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
const getTripByTripId = async (tripId) => {
    const trip = await prismaClient_1.prisma.trip.findUnique({
        where: {
            id: tripId,
        }
    });
    return trip;
};
const getTripByRequirementId = async (requirement_id) => {
    const trip = await prismaClient_1.prisma.trip.findFirst({
        where: {
            requirement_id: requirement_id,
        },
    });
    return trip;
};
const editTrip = async (tripId, editTrip) => {
    console.log("DB", tripId);
    console.log("DB", editTrip);
    const updatedTrip = await prismaClient_1.prisma.trip.update({
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
const patchTrip = async (tripId, patchData) => {
    await prismaClient_1.prisma.trip.update({
        where: {
            id: tripId
        },
        data: patchData
    });
};
exports.default = {
    createTrip,
    getTripByTripId,
    getTripByRequirementId,
    editTrip,
    patchTrip
};
//# sourceMappingURL=trip.js.map