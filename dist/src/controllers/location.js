"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationByTripId = exports.deleteLocation = exports.createLocation = void 0;
const location_1 = __importDefault(require("../service/location"));
const createLocation = async (req, res) => {
    const newLocation = req.body;
    const tripId = req.params.id;
    console.log("Location", newLocation);
    console.log("Trip Id", tripId);
    try {
        await location_1.default.createLocation(newLocation.id, newLocation.location, newLocation.description, newLocation.start_date_time, newLocation.end_date_time, tripId);
        res.status(201).send("Location created successfully");
    }
    catch (error) {
        res.status(401).send(error);
    }
};
exports.createLocation = createLocation;
const deleteLocation = async (req, res) => {
    const locationId = req.params.id;
    try {
        await location_1.default.deleteLocation(locationId);
        res.status(200).send("Location deleted successfully");
    }
    catch (error) {
        res.status(401).send(error);
    }
};
exports.deleteLocation = deleteLocation;
const getLocationByTripId = async (req, res) => {
    const tripId = req.params.id;
    try {
        const locationList = await location_1.default.getLocationByTripId(tripId);
        res.status(200).json(locationList);
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.getLocationByTripId = getLocationByTripId;
//# sourceMappingURL=location.js.map