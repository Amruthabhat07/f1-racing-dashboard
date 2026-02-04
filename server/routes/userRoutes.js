import express from "express";
import {
  updatePreferences,
  getPreferences,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/preferences", protect, getPreferences);
router.put("/preferences", protect, updatePreferences);

export default router;
