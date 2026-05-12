import Meal from "../models/Meal.js";

export const getMeals = async (req, res) => {
  const meals = await Meal.find().sort({ createdAt: -1 });
  res.json(meals);
};

export const createMeal = async (req, res) => {
  const meal = await Meal.create(req.body);
  res.status(201).json(meal);
};

export const updateMeal = async (req, res) => {
  const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!meal) {
    return res.status(404).json({ message: "Meal not found" });
  }

  res.json(meal);
};

export const deleteMeal = async (req, res) => {
  const meal = await Meal.findByIdAndDelete(req.params.id);

  if (!meal) {
    return res.status(404).json({ message: "Meal not found" });
  }

  res.json({ message: "Meal deleted" });
};
