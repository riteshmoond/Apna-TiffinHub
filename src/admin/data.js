export const stats = [
  { label: "Total Orders", value: "120", change: "+18 this week", tone: "bg-orange-50 text-primary" },
  { label: "Revenue", value: "₹45,000", change: "+₹8,400 this week", tone: "bg-emerald-50 text-green" },
  { label: "Customers", value: "78", change: "12 new customers", tone: "bg-blue-50 text-blue-600" },
  { label: "Pending Orders", value: "12", change: "Needs action", tone: "bg-amber-50 text-amber-600" },
];

export const orders = [
  { id: "ORD-101", customer: "Ritesh Sharma", plan: "Premium", status: "Delivered", amount: "₹90", time: "12:20 PM" },
  { id: "ORD-102", customer: "Priya Meena", plan: "Basic Veg", status: "Out for Delivery", amount: "₹60", time: "12:45 PM" },
  { id: "ORD-103", customer: "Aman Jain", plan: "Monthly", status: "Pending", amount: "₹2200", time: "01:10 PM" },
  { id: "ORD-104", customer: "Neha Gupta", plan: "Office Lunch", status: "Delivered", amount: "₹80", time: "01:30 PM" },
];

export const customers = [
  { name: "Ritesh Sharma", phone: "+91 98765 43210", address: "Mansarovar, Jaipur", totalOrders: 26 },
  { name: "Priya Meena", phone: "+91 99887 76655", address: "Vaishali Nagar, Jaipur", totalOrders: 14 },
  { name: "Aman Jain", phone: "+91 91234 56789", address: "Malviya Nagar, Jaipur", totalOrders: 31 },
  { name: "Neha Gupta", phone: "+91 97654 32109", address: "C-Scheme, Jaipur", totalOrders: 9 },
];

export const meals = [
  { title: "Basic Veg Thali", price: "₹60", category: "Veg", description: "4 roti, sabji, dal, rice" },
  { title: "Premium Paneer Thali", price: "₹90", category: "Premium", description: "Paneer, sweet, salad, buttermilk" },
  { title: "Office Lunch Box", price: "₹80", category: "Lunch", description: "Quick lunch with seasonal sabji" },
];

export const weeklyMenu = [
  { day: "Monday", menu: "Dal Tadka, Rice, Roti, Aloo Jeera" },
  { day: "Tuesday", menu: "Paneer Masala, Chapati, Salad" },
  { day: "Wednesday", menu: "Rajma Chawal, Roti, Pickle" },
  { day: "Thursday", menu: "Aloo Gobi, Dal, Rice, Roti" },
  { day: "Friday", menu: "Chole, Jeera Rice, Salad, Sweet" },
  { day: "Saturday", menu: "Mix Veg, Paratha, Curd" },
  { day: "Sunday", menu: "Special Veg Thali with Sweet" },
];

export const revenue = [
  { month: "Jan", value: 26000 },
  { month: "Feb", value: 31000 },
  { month: "Mar", value: 28000 },
  { month: "Apr", value: 39000 },
  { month: "May", value: 45000 },
];
