import express from "express";
import { getProfile, loginUser, registerUser, updateProfile } from "../controllers/userController.js";
import { protectUser } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectUser, getProfile);
router.put("/me", protectUser, updateProfile);

export default router;
