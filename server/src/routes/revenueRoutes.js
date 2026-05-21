import { adminProtect } from "../middleware/adminAuth.js";
import express from "express";
import { getRevenue } from "../controllers/revenueController.js";


const router = express.Router();

router.get("/", adminProtect, getRevenue);

export default router;
