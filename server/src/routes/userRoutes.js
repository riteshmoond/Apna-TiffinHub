import express from "express";
import { getProfile, loginUser, registerUser, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

export default router;
