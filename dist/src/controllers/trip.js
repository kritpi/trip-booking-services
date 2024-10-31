"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchTrip = exports.editTrip = exports.getTripByTripId = exports.getTripByRequirementId = void 0;
const trip_1 = __importDefault(require("../service/trip"));
const getTripByRequirementId = async (req, res) => {
    const requirementId = req.params.id;
    try {
        const trip = await trip_1.default.getTripByRequirementId(requirementId);
        res.status(200).json(trip);
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.getTripByRequirementId = getTripByRequirementId;
const getTripByTripId = async (req, res) => {
    const tripId = req.params.id;
    try {
        const trip = await trip_1.default.getTripByTripId(tripId);
        res.status(200).json(trip);
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.getTripByTripId = getTripByTripId;
const editTrip = async (req, res) => {
    const tripId = req.params.id;
    const editedTrip = req.body;
    console.log(tripId);
    console.log(editedTrip);
    try {
        await trip_1.default.editTrip(tripId, editedTrip);
        res.status(200).send("Edited");
    }
    catch (error) {
        res.status(404).send;
    }
};
exports.editTrip = editTrip;
const patchTrip = async (req, res) => {
    const tripId = req.params.id;
    const patched = req.body;
    console.log("Trip Id", tripId);
    console.log("Patched Trip", patched);
    try {
        await trip_1.default.patchTrip(tripId, patched);
        res.status(200).send("Trip Patched");
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.patchTrip = patchTrip;
//# sourceMappingURL=trip.js.map