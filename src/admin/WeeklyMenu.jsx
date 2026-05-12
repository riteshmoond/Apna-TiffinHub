import { useEffect, useState } from "react";
import { api } from "./api";
import { weeklyMenu as initialWeeklyMenu } from "./data";

const WeeklyMenu = () => {
  const [menu, setMenu] = useState(initialWeeklyMenu);

  useEffect(() => {
    api.getMenu().then((items) => {
      if (items.length) setMenu(items);
    }).catch(() => setMenu(initialWeeklyMenu));
  }, []);

  const updateMenu = (day, value) => {
    setMenu((current) => current.map((row) => (row.day === day ? { ...row, menu: value } : row)));
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h2 className="text-2xl font-black text-dark">Update Weekly Menu</h2>
      <div className="mt-6 grid gap-4">
        {menu.map((row) => (
          <label key={row.day} className="grid gap-3 rounded-xl border border-gray-100 bg-slate-50 p-4 md:grid-cols-[140px_1fr] md:items-center">
            <span className="font-black text-primary">{row.day}</span>
            <input
              value={row.menu}
              onChange={(event) => updateMenu(row.day, event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold outline-none focus:border-primary"
            />
          </label>
        ))}
      </div>
      <button onClick={() => api.updateMenu(menu).catch(() => {})} className="mt-6 rounded-xl bg-dark px-6 py-3 font-black text-white">Save Menu</button>
    </div>
  );
};

export default WeeklyMenu;
