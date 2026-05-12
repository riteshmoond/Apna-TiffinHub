import Order from "../models/Order.js";

export const getRevenue = async (req, res) => {
  const deliveredOrders = await Order.find({ status: "Delivered" });
  const monthlyMap = new Map();

  deliveredOrders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("en-IN", { month: "short" });
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + order.amount);
  });

  const revenue = Array.from(monthlyMap.entries()).map(([month, value]) => ({ month, value }));
  res.json(revenue);
};
