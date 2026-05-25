import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import Admin from "./src/models/Admin.js";
import CatalogItem from "./src/models/CatalogItem.js";
import Customer from "./src/models/Customer.js";
import GalleryItem from "./src/models/GalleryItem.js";
import Meal from "./src/models/Meal.js";
import MenuItem from "./src/models/MenuItem.js";
import Order from "./src/models/Order.js";
import User from "./src/models/User.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([
    Admin.deleteMany(),
    CatalogItem.deleteMany(),
    Customer.deleteMany(),
    GalleryItem.deleteMany(),
    Meal.deleteMany(),
    MenuItem.deleteMany(),
    Order.deleteMany(),
    User.deleteMany(),
  ]);

  await Admin.create({
    name: "Royal Admin",
    email: process.env.ADMIN_EMAIL || "admin@royaltiffin.com",
    password: process.env.ADMIN_PASSWORD || "admin123",
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

  await CatalogItem.insertMany([
    {
      category: "Tiffin Thali",
      name: "Basic Veg Thali",
      price: 60,
      description: "4 roti, seasonal sabji, dal, rice, and salad.",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
      isAvailable: true,
    },
    {
      category: "Tiffin Thali",
      name: "Premium Paneer Thali",
      price: 90,
      description: "Paneer sabji, dal, rice, roti, sweet, salad, and buttermilk.",
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
      isAvailable: true,
    },
    {
      category: "Office Lunch",
      name: "Office Lunch Box",
      price: 80,
      description: "Compact lunch with roti, sabji, dal, rice, and pickle.",
      imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
      isAvailable: true,
    },
    {
      category: "Combos",
      name: "Rajma Rice Bowl",
      price: 70,
      description: "Homestyle rajma with steamed rice and onion salad.",
      imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80",
      isAvailable: true,
    },
    {
      category: "Add-ons",
      name: "Extra Roti Pack",
      price: 20,
      description: "Two soft rotis packed fresh with your meal.",
      imageUrl: "https://images.unsplash.com/photo-1598515214146-dab39da1243d?auto=format&fit=crop&w=900&q=80",
      isAvailable: true,
    },
    {
      category: "Add-ons",
      name: "Sweet of the Day",
      price: 30,
      description: "Fresh daily sweet portion with lunch or dinner.",
      imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      isAvailable: true,
    },
  ]);

  await GalleryItem.insertMany([
    {
      title: "Fresh Veg Thali",
      tag: "Lunch",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
      isFeatured: true,
    },
    {
      title: "Paneer Special",
      tag: "Premium",
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
      isFeatured: true,
    },
    {
      title: "Clean Tiffin Packing",
      tag: "Hygienic",
      imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
      isFeatured: false,
    },
    {
      title: "Office Lunch Box",
      tag: "Office",
      imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
      isFeatured: false,
    },
    {
      title: "Rajma Rice Bowl",
      tag: "Homestyle",
      imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80",
      isFeatured: false,
    },
    {
      title: "Evening Dinner Prep",
      tag: "Fresh",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
      isFeatured: false,
    },
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
    password: "user123",
  });

  await Order.insertMany([
    { user: demoUser._id, customer: "Ritesh Sharma", phone: "+91 98765 43210", address: "Mansarovar, Jaipur", plan: "Premium", status: "Delivered", amount: 90, time: "12:20 PM" },
    { user: demoUser._id, customer: "Priya Meena", phone: "+91 99887 76655", address: "Vaishali Nagar, Jaipur", plan: "Basic Veg", status: "Out for Delivery", amount: 60, time: "12:45 PM" },
    { user: demoUser._id, customer: "Aman Jain", phone: "+91 91234 56789", address: "Malviya Nagar, Jaipur", plan: "Monthly", status: "Pending", amount: 2200, time: "01:10 PM" },
  ]);

  console.log("Seed data inserted");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
