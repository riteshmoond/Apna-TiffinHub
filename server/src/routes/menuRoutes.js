import { adminProtect } from "../middleware/adminAuth.js";
import express from "express";
import { getMenu, updateMenu } from "../controllers/menuController.js";


const router = express.Router();

router.get("/", getMenu);
router.put("/", adminProtect, updateMenu);

export default router;
