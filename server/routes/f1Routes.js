import express from "express";
import {
  getDrivers,
  getRaces,
  getDriverByNumber
} from "../controllers/f1Controller.js";
import { getDriverLapStats } from "../controllers/f1Controller.js";

const router = express.Router();

router.get("/drivers", getDrivers);
router.get("/drivers/:driverNumber", getDriverByNumber);
router.get("/races", getRaces);
router.get("/drivers/:driverNumber/laps", getDriverLapStats);


export default router;

