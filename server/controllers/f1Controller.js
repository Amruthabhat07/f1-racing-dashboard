import Driver from "../models/Driver.js";
import Race from "../models/Race.js";
import { fetchDrivers, fetchRaces } from "../services/openF1Service.js";

// GET /api/f1/drivers
export const getDrivers = async (req, res) => {
  try {
    // 1. Check cache
    const cachedDrivers = await Driver.find();
    if (cachedDrivers.length > 0) {
      return res.status(200).json(cachedDrivers);
    }

    // 2️. Fetch from OpenF1
    const drivers = await fetchDrivers();

    // 3️. Save to MongoDB
    await Driver.insertMany(drivers);

    res.status(200).json(drivers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch drivers" });
  }
};

// GET /api/f1/races
export const getRaces = async (req, res) => {
  try {
    const cachedRaces = await Race.find();
    if (cachedRaces.length > 0) {
      return res.status(200).json(cachedRaces);
    }

    const races = await fetchRaces();
    await Race.insertMany(races);

    res.status(200).json(races);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch races" });
  }
};

// GET /api/f1/drivers/:driverNumber
export const getDriverByNumber = async (req, res) => {
  try {
    const { driverNumber } = req.params;

    const driver = await Driver.findOne({
      driver_number: Number(driverNumber)
    });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch driver" });
  }
};


