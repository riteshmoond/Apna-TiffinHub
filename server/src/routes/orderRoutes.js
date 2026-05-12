import express from "express";
import { cancelMyOrder, createOrder, getMyOrders, getOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
import { protectUser } from "../middleware/userAuth.js";

const router = express.Router();

router.get("/", protect, getOrders);
router.get("/my", protectUser, getMyOrders);
router.post("/", protectUser, createOrder);
router.delete("/my/:id", protectUser, cancelMyOrder);
router.patch("/:id/status", protect, updateOrderStatus);

export default router;
