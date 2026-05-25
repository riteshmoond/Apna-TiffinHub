import { useEffect, useState } from "react";
import { getWeeklyMenu } from "../lib/publicApi";

const fallbackMenu = [
  { day: "Monday", menu: "Dal Tadka, Rice, Roti, Aloo Jeera" },
  { day: "Tuesday", menu: "Paneer Masala, Chapati, Salad" },
  { day: "Wednesday", menu: "Rajma Chawal, Roti, Pickle" },
  { day: "Thursday", menu: "Aloo Gobi, Dal, Rice, Roti" },
  { day: "Friday", menu: "Chole, Jeera Rice, Salad, Sweet" },
  { day: "Saturday", menu: "Mix Veg, Paratha, Curd" },
  { day: "Sunday", menu: "Special Veg Thali with Sweet" },
];

const WeeklyMenu = () => {
  const [menu, setMenu] = useState(fallbackMenu);
  const [error, setError] = useState("");

  useEffect(() => {
    getWeeklyMenu()
      .then((items) => {
        if (items.length) setMenu(items);
      })
      .catch((err) => setError(err.message || "Menu load failed"));
  }, []);

  return (
    <section id="menu" className="bg-cream py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Weekly menu</span>
          <h2 className="section-title mt-3">Fresh Variety Every Day</h2>
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-orange-100 bg-white shadow-xl shadow-orange-100">
          {menu.map((item) => (
            <div key={item._id || item.day} className="grid gap-2 border-b border-orange-100 p-5 last:border-b-0 sm:grid-cols-[180px_1fr]">
              <div className="font-black text-primary">{item.day}</div>
              <div className="font-semibold text-gray-700">{item.menu}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyMenu;
