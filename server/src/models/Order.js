import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    plan: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    mealTime: { type: String, default: "Lunch" },
    deliveryDate: { type: String, default: "" },
    paymentMode: { type: String, default: "Cash on Delivery" },
    instructions: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Delivered"],
      default: "Pending",
    },
    amount: { type: Number, required: true },
    time: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
