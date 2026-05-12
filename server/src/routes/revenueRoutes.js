import express from "express";
import { getRevenue } from "../controllers/revenueController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getRevenue);

export default router;
