import Order from "../models/Order.js";

const toDateKey = (date) => date.toISOString().split("T")[0];

export const getAnalytics = async (req, res) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWindow = new Date(startOfToday);
  startOfWindow.setDate(startOfWindow.getDate() - 6);

  const [ordersWindow, pendingOrders, totalOrdersToday, deliveredOrders] = await Promise.all([
    Order.find({ createdAt: { $gte: startOfWindow } }),
    Order.countDocuments({ status: "Pending" }),
    Order.countDocuments({ createdAt: { $gte: startOfToday } }),
    Order.find({ status: "Delivered", createdAt: { $gte: startOfWindow } }),
  ]);

  const dailyMap = new Map();
  const revenueMap = new Map();
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(startOfWindow);
    date.setDate(startOfWindow.getDate() + i);
    const key = toDateKey(date);
    dailyMap.set(key, 0);
    revenueMap.set(key, 0);
  }

  ordersWindow.forEach((order) => {
    const key = toDateKey(new Date(order.createdAt));
    dailyMap.set(key, (dailyMap.get(key) || 0) + 1);
  });

  deliveredOrders.forEach((order) => {
    const key = toDateKey(new Date(order.createdAt));
    revenueMap.set(key, (revenueMap.get(key) || 0) + Number(order.amount || 0));
  });

  const popularPlansRaw = await Order.aggregate([
    { $group: { _id: "$plan", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const dailyOrders = Array.from(dailyMap.entries()).map(([date, count]) => ({ date, count }));
  const revenueByDay = Array.from(revenueMap.entries()).map(([date, value]) => ({ date, value }));
  const popularPlans = popularPlansRaw.map((item) => ({ plan: item._id, count: item.count }));

  res.json({
    dailyOrders,
    revenueByDay,
    pendingOrders,
    totalOrdersToday,
    popularPlans,
  });
};
