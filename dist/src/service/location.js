"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../utils/prismaClient");
const createLocation = async (id, location, description, start_date_time, end_date_time, trip_id) => {
    const newLocation = await prismaClient_1.prisma.location.create({
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
const deleteLocation = async (locationId) => {
    const deleteLocation = await prismaClient_1.prisma.location.delete({
        where: {
            id: locationId,
        },
    });
};
const getLocationByTripId = async (tripId) => {
    const locationList = await prismaClient_1.prisma.location.findMany({
        where: {
            trip_id: tripId,
        },
    });
    return locationList;
};
exports.default = {
    createLocation,
    deleteLocation,
    getLocationByTripId,
};
//# sourceMappingURL=location.js.map