import express from "express";
import {
  getDrivers,
  getRaces,
  getDriverByNumber
} from "../controllers/f1Controller.js";
import { getDriverLapStats } from "../controllers/f1Controller.js";
import { getDriverMomentum } from "../controllers/f1Controller.js";
import { getDriverRawLaps } from "../controllers/f1Controller.js";



const router = express.Router();

router.get("/drivers", getDrivers);
router.get("/drivers/:driverNumber", getDriverByNumber);
router.get("/races", getRaces);
router.get("/drivers/:driverNumber/laps", getDriverLapStats);
router.get("/drivers/:driverNumber/momentum", getDriverMomentum);
router.get("/drivers/:driverNumber/laps/raw", getDriverRawLaps);


export default router;

