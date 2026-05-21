import mongoose from "mongoose";

const catalogItemSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, default: "", trim: true },
    imageUrl: { type: String, default: "", trim: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("CatalogItem", catalogItemSchema);
