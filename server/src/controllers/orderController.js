import Customer from "../models/Customer.js";
import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.body,
    user: req.user._id,
    customer: req.body.customer || req.user.name,
    phone: req.body.phone || req.user.phone,
    address: req.body.address || req.user.address,
  });

  await Customer.findOneAndUpdate(
    { phone: order.phone },
    {
      $set: { name: order.customer, phone: order.phone, address: order.address },
      $inc: { totalOrders: 1 },
    },
    { upsert: true, new: true }
  );

  res.status(201).json(order);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};
