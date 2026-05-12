import express from "express";
import { getCustomers } from "../controllers/customerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getCustomers);

export default router;
