import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import CatalogItem from "./src/models/CatalogItem.js";
import GalleryItem from "./src/models/GalleryItem.js";
import MenuItem from "./src/models/MenuItem.js";

dotenv.config();

const weeklyMenu = [
  { day: "Monday", menu: "Dal Tadka, Rice, Roti, Aloo Jeera" },
  { day: "Tuesday", menu: "Paneer Masala, Chapati, Salad" },
  { day: "Wednesday", menu: "Rajma Chawal, Roti, Pickle" },
  { day: "Thursday", menu: "Aloo Gobi, Dal, Rice, Roti" },
  { day: "Friday", menu: "Chole, Jeera Rice, Salad, Sweet" },
  { day: "Saturday", menu: "Mix Veg, Paratha, Curd" },
  { day: "Sunday", menu: "Special Veg Thali with Sweet" },
];

const catalogItems = [
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
];

const galleryItems = [
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
];

const upsertContent = async () => {
  await connectDB();

  await Promise.all(
    weeklyMenu.map((item) =>
      MenuItem.findOneAndUpdate({ day: item.day }, item, { upsert: true, new: true, runValidators: true })
    )
  );

  await Promise.all(
    catalogItems.map((item) =>
      CatalogItem.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true, runValidators: true })
    )
  );

  await Promise.all(
    galleryItems.map((item) =>
      GalleryItem.findOneAndUpdate({ title: item.title }, item, { upsert: true, new: true, runValidators: true })
    )
  );

  console.log("Menu, catalog, and gallery content upserted");
  process.exit(0);
};

upsertContent().catch((error) => {
  console.error(error);
  process.exit(1);
});
