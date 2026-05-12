import express from "express";
import { getMenu, updateMenu } from "../controllers/menuController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMenu);
router.put("/", protect, updateMenu);

export default router;
