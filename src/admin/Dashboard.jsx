import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Orders from "./Orders";
import Customers from "./Customers";
import Meals from "./Meals";
import WeeklyMenu from "./WeeklyMenu";
import Catalog from "./Catalog";
import GalleryAdmin from "./GalleryAdmin";
import Revenue from "./Revenue";
import { customers as initialCustomers, orders as initialOrders, revenue as initialRevenue } from "./data";
import { api, isAdminLoggedIn } from "./api";
import StatusBadge from "./StatusBadge";

const DashboardHome = ({ onOpenOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [customers, setCustomers] = useState(initialCustomers);
  const [revenue, setRevenue] = useState(initialRevenue);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.getOrders().then(setOrders).catch(() => setOrders(initialOrders));
    api.getCustomers().then(setCustomers).catch(() => setCustomers(initialCustomers));
    api.getRevenue().then((items) => {
      if (items.length) setRevenue(items);
    }).catch(() => setRevenue(initialRevenue));
    api.getAnalytics().then(setAnalytics).catch(() => setAnalytics(null));
  }, []);

  const totalRevenue = revenue.reduce((sum, item) => sum + item.value, 0);
  const pendingOrders = analytics?.pendingOrders ?? orders.filter((order) => order.status === "Pending").length;
  const todaysOrders = analytics?.totalOrdersToday ?? orders.length;
  const dailyOrders = analytics?.dailyOrders ?? [];
  const popularPlans = analytics?.popularPlans ?? [];
  const maxDailyOrders = Math.max(...dailyOrders.map((item) => item.count), 1);
  const statCards = [
    { label: "Today's Orders", value: todaysOrders, change: "Last 24 hours", tone: "bg-orange-50 text-primary" },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, change: "Delivered orders", tone: "bg-emerald-50 text-green" },
    { label: "Customers", value: customers.length, change: `${customers.length} active customers`, tone: "bg-blue-50 text-blue-600" },
    { label: "Pending Orders", value: pendingOrders, change: "Needs action", tone: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className={`inline-flex rounded-xl px-3 py-1 text-xs font-black ${card.tone}`}>{card.change}</div>
            <h2 className="mt-5 text-sm font-black uppercase tracking-wide text-gray-500">{card.label}</h2>
            <div className="mt-2 text-4xl font-black text-dark">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-dark">Daily Orders</h2>
              <p className="mt-1 text-sm font-semibold text-gray-500">Last 7 days order volume.</p>
            </div>
          </div>
          <div className="mt-6 flex h-56 items-end gap-3 rounded-xl bg-cream p-4">
            {dailyOrders.length ? (
              dailyOrders.map((item) => (
                <div key={item.date} className="flex flex-1 flex-col items-center gap-2">
                  <div className="text-xs font-black text-dark">{item.count}</div>
                  <div
                    className="w-full rounded-t-xl bg-primary shadow-lg shadow-orange-200"
                    style={{ height: `${(item.count / maxDailyOrders) * 160}px` }}
                  />
                  <div className="text-xs font-black text-gray-500">
                    {new Date(item.date).toLocaleDateString("en-IN", { weekday: "short" })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm font-bold text-gray-500">No data yet</div>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-2xl font-black text-dark">Popular Meal Plans</h2>
          <p className="mt-1 text-sm font-semibold text-gray-500">Most ordered plans this week.</p>
          <div className="mt-6 space-y-3">
            {popularPlans.length ? (
              popularPlans.map((item) => (
                <div key={item.plan} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <div className="font-bold text-dark">{item.plan}</div>
                  <div className="text-sm font-black text-primary">{item.count} orders</div>
                </div>
              ))
            ) : (
              <div className="text-sm font-bold text-gray-500">No data yet</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-dark">Recent Orders</h2>
              <p className="mt-1 text-sm font-semibold text-gray-500">Latest customer orders and live status.</p>
            </div>
            <button onClick={onOpenOrders} className="rounded-xl bg-primary px-4 py-2 font-black text-white">
              View all
            </button>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b text-sm font-black uppercase text-gray-500">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 3).map((order) => (
                  <tr key={order._id || order.id} className="border-b last:border-b-0">
                    <td className="py-4 font-bold text-dark">{order.customer}</td>
                    <td className="py-4 text-gray-600">{order.plan}</td>
                    <td className="py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 font-black text-primary">
                      {typeof order.amount === "number" ? `₹${order.amount}` : order.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-dark p-6 text-white shadow-sm">
          <h2 className="text-2xl font-black">Today Checklist</h2>
          <div className="mt-6 space-y-4">
            {["Confirm pending orders", "Update evening menu", "Check delivery partners", "Export daily revenue"].map((task) => (
              <label key={task} className="flex items-center gap-3 rounded-xl bg-white/10 p-4 font-semibold">
                <input type="checkbox" className="h-5 w-5 accent-primary" />
                {task}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const titles = {
  dashboard: ["Dashboard", "Track orders, revenue, customers, and kitchen tasks."],
  orders: ["Orders", "Manage live order status from pending to delivered."],
  meals: ["Meals", "Add, edit, or delete tiffin meals and prices."],
  customers: ["Customers", "View customer details and order history."],
  revenue: ["Revenue", "Track monthly revenue performance."],
  "weekly-menu": ["Weekly Menu", "Update day-wise meals for customers."],
  catalog: ["Menu Catalog", "Manage photos, prices, and combos."],
  gallery: ["Gallery", "Manage homepage gallery photos."],
};

const Dashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, subtitle] = useMemo(() => titles[activeView], [activeView]);
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  const changeView = (view) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const renderView = () => {
    switch (activeView) {
      case "orders":
        return <Orders />;
      case "meals":
        return <Meals />;
      case "customers":
        return <Customers />;
      case "revenue":
        return <Revenue />;
      case "weekly-menu":
        return <WeeklyMenu />;
      case "catalog":
        return <Catalog />;
      case "gallery":
        return <GalleryAdmin />;
      default:
        return <DashboardHome onOpenOrders={() => changeView("orders")} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        activeView={activeView}
        onChangeView={changeView}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((value) => !value)}
      />

      {isSidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close admin menu"
        />
      )}

      <main className="lg:ml-72">
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 px-5 py-5 backdrop-blur lg:px-8">
          <div className="ml-14 lg:ml-0">
            <h1 className="text-3xl font-black text-dark">{title}</h1>
            <p className="mt-1 font-semibold text-gray-500">{subtitle}</p>
          </div>
        </header>
        <div className="p-5 lg:p-8">{renderView()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
