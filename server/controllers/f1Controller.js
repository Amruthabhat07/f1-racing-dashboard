import { fetchDrivers, fetchRaces } from "../services/openF1Service.js";

export const getDrivers = async (req, res) => {
  try {
    const drivers = await fetchDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch drivers" });
  }
};

export const getRaces = async (req, res) => {
  try {
    const races = await fetchRaces();
    res.status(200).json(races);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch races" });
  }
};
