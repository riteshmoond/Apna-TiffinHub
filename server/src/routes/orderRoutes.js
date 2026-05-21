import express from "express";
import { cancelMyOrder, createOrder, getMyOrders, getOrders, updateOrderStatus } from "../controllers/orderController.js";

import { protect } from "../middleware/userAuth.js";
import { adminProtect } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminProtect, getOrders);
router.get("/my", protect, getMyOrders);
router.post("/", protect, createOrder);
router.delete("/my/:id", protect, cancelMyOrder);
router.patch("/:id/status", adminProtect, updateOrderStatus);

export default router;
