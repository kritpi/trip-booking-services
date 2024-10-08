import { Request, Response } from "express";
import locationServices from "../service/location";

export const createLocation = async (req: Request, res: Response) => {
  const newLocation = req.body;
  const tripId = req.params.id;
  console.log("Location", newLocation);
  console.log("Trip Id", tripId);
  try {
    await locationServices.createLocation(
      newLocation.id,
      newLocation.location,
      newLocation.description,
      newLocation.start_date_time,
      newLocation.end_date_time,
      tripId
    );
    res.status(201).send("Location created successfully");
  } catch (error) {
    res.status(401).send(error);
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  const locationId = req.params.id;
  try {
    await locationServices.deleteLocation(locationId)
    res.status(200).send("Location deleted successfully");
  } catch (error) {
    res.status(401).send(error);
  }
};

export const getLocationByTripId = async (req: Request, res: Response) => {
  const tripId = req.params.id;
  try {
    const locationList = await locationServices.getLocationByTripId(tripId);
    res.status(200).json(locationList);
  } catch (error) {
    res.status(404).send(error);
  }
}
