import Driver from "../models/Driver.js";
import { fetchCurrentRaceDrivers } from "../services/openF1Service.js";
import axios from "axios";
import { fetchDriverLapStats } from "../services/openF1Service.js";
import { fetchDriverRaceMomentum } from "../services/openF1Service.js";

const OPENF1_BASE_URL = "https://api.openf1.org/v1";

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

// ===============================
// GET Lap timings 
// ===============================

export const getDriverLapStats = async (req, res) => {
  try {
    const { driverNumber } = req.params;

    const stats = await fetchDriverLapStats(driverNumber);

    res.status(200).json(stats);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch lap stats" });
  }
};

// ===============================
// GET position in each lap
// ===============================


export const getDriverMomentum = async (req, res) => {
  try {
    const { driverNumber } = req.params;

    const momentum = await fetchDriverRaceMomentum(driverNumber);

    res.status(200).json(momentum);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch race momentum" });
  }
};


export const getDriverRawLaps = async (req, res) => {
  try {
    const { driverNumber } = req.params;

    const meetingsRes = await axios.get(
      "https://api.openf1.org/v1/meetings"
    );

    if (!meetingsRes.data.length) {
      throw new Error("No meetings");
    }

    const latestMeeting = meetingsRes.data.at(-1);

    const sessionsRes = await axios.get(
      `https://api.openf1.org/v1/sessions?meeting_key=${latestMeeting.meeting_key}`
    );

    const raceSession = sessionsRes.data.find(
      s => s.session_name?.toLowerCase().includes("race")
    );

    if (!raceSession) {
      throw new Error("No race session");
    }

    const lapsRes = await axios.get(
      `https://api.openf1.org/v1/laps?session_key=${raceSession.session_key}&driver_number=${driverNumber}`
    );

    const validLaps = lapsRes.data.filter(
      l =>
        l.lap_duration &&
        l.lap_duration > 60 &&
        l.lap_duration < 200
    );

    // ✅ If real laps exist, return them
    if (validLaps.length > 0) {
      return res.json(validLaps);
    }

    throw new Error("No valid laps");

  } catch (error) {
    console.warn("Raw laps demo fallback:", error.message);

    // ✅ DEMO LAP DATA
    const demoLaps = Array.from({ length: 55 }, (_, i) => ({
      lap_number: i + 1,
      lap_duration: 88 + Math.random() * 6,
    }));

    res.json(demoLaps);
  }
};




