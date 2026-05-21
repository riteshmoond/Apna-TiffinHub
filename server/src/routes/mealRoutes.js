import { adminProtect } from "../middleware/adminAuth.js";
import express from "express";
import { createMeal, deleteMeal, getMeals, updateMeal } from "../controllers/mealController.js";


const router = express.Router();

router.get("/", adminProtect, getMeals);
router.post("/", adminProtect, createMeal);
router.put("/:id", adminProtect, updateMeal);
router.delete("/:id", adminProtect, deleteMeal);

export default router;
