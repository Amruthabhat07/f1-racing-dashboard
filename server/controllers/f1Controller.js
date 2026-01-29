import Driver from "../models/Driver.js";
import { fetchCurrentRaceDrivers } from "../services/openF1Service.js";
import axios from "axios";

// ===============================
// GET ALL DRIVERS (CURRENT GRID)
// ===============================
export const getDrivers = async (req, res) => {
  try {
    

    const cachedDrivers = await Driver.find();

    if (cachedDrivers.length > 0) {
      return res.status(200).json(cachedDrivers);
    }

    const drivers = await fetchCurrentRaceDrivers();
    await Driver.insertMany(drivers);

    res.status(200).json(drivers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch drivers" });
  }
};

// ===============================
// GET SINGLE DRIVER BY NUMBER
// ===============================
export const getDriverByNumber = async (req, res) => {
  try {
    const { driverNumber } = req.params;

    const driver = await Driver.findOne({
      driver_number: Number(driverNumber),
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

// ===============================
// GET RACES (BASIC VERSION)
// ===============================
export const getRaces = async (req, res) => {
  try {
    // Fetch race sessions only
    const response = await axios.get(
      "https://api.openf1.org/v1/sessions?session_name=Race"
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch races" });
  }
};
