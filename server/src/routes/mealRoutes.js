import express from "express";
import { createMeal, deleteMeal, getMeals, updateMeal } from "../controllers/mealController.js";


const router = express.Router();

router.get("/", getMeals);
router.post("/", createMeal);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);

export default router;
