import express from "express";
import { cancelMyOrder, createOrder, getMyOrders, getOrders, updateOrderStatus } from "../controllers/orderController.js";

import { protect } from "../middleware/userAuth.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/my", protect, getMyOrders);
router.post("/", protect, createOrder);
router.delete("/my/:id", protect, cancelMyOrder);
router.patch("/:id/status", updateOrderStatus);

export default router;
