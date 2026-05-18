import express from "express";
import { getMenu, updateMenu } from "../controllers/menuController.js";


const router = express.Router();

router.get("/", getMenu);
router.put("/", updateMenu);

export default router;
