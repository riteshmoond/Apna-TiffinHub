import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Meal", mealSchema);
