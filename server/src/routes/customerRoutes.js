import { adminProtect } from "../middleware/adminAuth.js";
import express from "express";
import { getCustomers } from "../controllers/customerController.js";


const router = express.Router();

router.get("/", adminProtect, getCustomers);

export default router;
