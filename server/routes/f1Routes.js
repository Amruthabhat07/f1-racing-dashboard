import express from "express";
import { getDrivers, getRaces } from "../controllers/f1Controller.js";

const router = express.Router();

router.get("/drivers", getDrivers);
router.get("/races", getRaces);

export default router;

