import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    day: { type: String, required: true, unique: true },
    menu: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
