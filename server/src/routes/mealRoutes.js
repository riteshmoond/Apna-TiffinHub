import express from "express";
import { createMeal, deleteMeal, getMeals, updateMeal } from "../controllers/mealController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMeals);
router.post("/", protect, createMeal);
router.put("/:id", protect, updateMeal);
router.delete("/:id", protect, deleteMeal);

export default router;
