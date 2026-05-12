import express from "express";
import { getProfile, loginUser, registerUser } from "../controllers/userController.js";
import { protectUser } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectUser, getProfile);

export default router;
