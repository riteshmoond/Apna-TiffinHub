import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import Admin from "./src/models/Admin.js";
import Customer from "./src/models/Customer.js";
import Meal from "./src/models/Meal.js";
import MenuItem from "./src/models/MenuItem.js";
import Order from "./src/models/Order.js";
import User from "./src/models/User.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([
    Admin.deleteMany(),
    Customer.deleteMany(),
    Meal.deleteMany(),
    MenuItem.deleteMany(),
    Order.deleteMany(),
    User.deleteMany(),
  ]);

  await Admin.create({
    name: "Royal Admin",
    email: process.env.ADMIN_EMAIL || "admin@royaltiffin.com",
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10),
  });

  await Meal.insertMany([
    { title: "Basic Veg Thali", price: 60, category: "Veg", description: "4 roti, sabji, dal, rice" },
    { title: "Premium Paneer Thali", price: 90, category: "Premium", description: "Paneer, sweet, salad, buttermilk" },
    { title: "Office Lunch Box", price: 80, category: "Lunch", description: "Quick lunch with seasonal sabji" },
  ]);

  await MenuItem.insertMany([
    { day: "Monday", menu: "Dal Tadka, Rice, Roti, Aloo Jeera" },
    { day: "Tuesday", menu: "Paneer Masala, Chapati, Salad" },
    { day: "Wednesday", menu: "Rajma Chawal, Roti, Pickle" },
    { day: "Thursday", menu: "Aloo Gobi, Dal, Rice, Roti" },
    { day: "Friday", menu: "Chole, Jeera Rice, Salad, Sweet" },
    { day: "Saturday", menu: "Mix Veg, Paratha, Curd" },
    { day: "Sunday", menu: "Special Veg Thali with Sweet" },
  ]);

  await Customer.insertMany([
    { name: "Ritesh Sharma", phone: "+91 98765 43210", address: "Mansarovar, Jaipur", totalOrders: 26 },
    { name: "Priya Meena", phone: "+91 99887 76655", address: "Vaishali Nagar, Jaipur", totalOrders: 14 },
    { name: "Aman Jain", phone: "+91 91234 56789", address: "Malviya Nagar, Jaipur", totalOrders: 31 },
  ]);

  const demoUser = await User.create({
    name: "Demo Customer",
    phone: "9257479576",
    email: "customer@example.com",
    address: "Mansarovar, Jaipur",
    password: await bcrypt.hash("user123", 10),
  });

  await Order.insertMany([
    { user: demoUser._id, customer: "Ritesh Sharma", phone: "+91 98765 43210", address: "Mansarovar, Jaipur", plan: "Premium", status: "Delivered", amount: 90, time: "12:20 PM" },
    { user: demoUser._id, customer: "Priya Meena", phone: "+91 99887 76655", address: "Vaishali Nagar, Jaipur", plan: "Basic Veg", status: "Preparing", amount: 60, time: "12:45 PM" },
    { user: demoUser._id, customer: "Aman Jain", phone: "+91 91234 56789", address: "Malviya Nagar, Jaipur", plan: "Monthly", status: "Pending", amount: 2200, time: "01:10 PM" },
  ]);

  console.log("Seed data inserted");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
