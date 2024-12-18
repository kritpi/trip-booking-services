import { Request, Response } from "express";
import tripServices from "../service/trip";

export const getTripByRequirementId = async (req: Request, res: Response) => {
  const requirementId = req.params.id;
  try {
    const trip = await tripServices.getTripByRequirementId(requirementId);
    res.status(200).json(trip);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getTripByTripId = async (req: Request, res: Response) => {
  const tripId = req.params.id;
  try {
    const trip = await tripServices.getTripByTripId(tripId);
    res.status(200).json(trip);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const editTrip = async (req: Request, res: Response) => {
  const tripId = req.params.id;
  const editedTrip = req.body;
  console.log(tripId);
  console.log(editedTrip);
  try {
    await tripServices.editTrip(tripId, editedTrip);
    res.status(200).send("Edited");
  } catch (error) {
    res.status(404).send;
  }
};

export const patchTrip = async (req: Request, res: Response) => {
  const tripId = req.params.id;
  const patched = req.body;

  console.log("Trip Id", tripId);
  console.log("Patched Trip", patched);

  try {
    await tripServices.patchTrip(tripId, patched);
    res.status(200).send("Trip Patched");
  } catch (error) {
    res.status(400).send(error);
  }
};
