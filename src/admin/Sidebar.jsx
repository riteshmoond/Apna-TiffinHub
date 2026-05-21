import {
  FiBarChart2,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import { LuSoup } from "react-icons/lu";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { clearSession } from "./api";

const items = [
  { id: "dashboard", label: "Dashboard", icon: FiGrid },
  { id: "orders", label: "Orders", icon: FiShoppingBag },
  { id: "meals", label: "Meals", icon: LuSoup },
  { id: "customers", label: "Customers", icon: FiUsers },
  { id: "revenue", label: "Revenue", icon: FiBarChart2 },
  { id: "weekly-menu", label: "Weekly Menu", icon: MdOutlineRestaurantMenu },
  { id: "catalog", label: "Menu Catalog", icon: MdOutlineRestaurantMenu },
  { id: "gallery", label: "Gallery", icon: MdOutlineRestaurantMenu },
];

const Sidebar = ({ activeView, onChangeView, isOpen, onToggle }) => {
  const handleLogout = () => {
    clearSession();
    window.location.href = "/admin/login";
  };

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 rounded-xl bg-[#1f2937] p-3 text-white shadow-lg lg:hidden"
        aria-label="Toggle admin menu"
      >
        <FiMenu />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[#1f2937] px-5 py-6 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8">
          <div className="text-2xl font-black">Royal Admin</div>
          <div className="mt-1 text-sm font-semibold text-gray-400">Tiffin operations panel</div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeView(item.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left font-bold transition ${
                  isActive ? "bg-[#ff6b00] text-white shadow-lg shadow-orange-900/30" : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="text-xl" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 font-bold text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
