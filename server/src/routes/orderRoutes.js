import express from "express";
import { createOrder, getMyOrders, getOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
import { protectUser } from "../middleware/userAuth.js";

const router = express.Router();

router.get("/", protect, getOrders);
router.get("/my", protectUser, getMyOrders);
router.post("/", protectUser, createOrder);
router.patch("/:id/status", protect, updateOrderStatus);

export default router;
