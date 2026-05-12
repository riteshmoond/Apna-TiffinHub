import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { revenue } from "./data";

const Revenue = () => {
  const [revenueItems, setRevenueItems] = useState(revenue);
  const maxRevenue = useMemo(() => Math.max(...revenueItems.map((item) => item.value), 1), [revenueItems]);

  useEffect(() => {
    api.getRevenue().then((items) => {
      if (items.length) setRevenueItems(items);
    }).catch(() => setRevenueItems(revenue));
  }, []);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-dark">Revenue Analytics</h2>
          <p className="mt-1 font-semibold text-gray-500">Simple monthly chart without extra chart dependency.</p>
        </div>
        <button className="rounded-xl bg-primary px-5 py-3 font-black text-white">Export Orders</button>
      </div>

      <div className="mt-10 flex h-80 items-end gap-4 rounded-xl bg-cream p-5">
        {revenueItems.map((item) => (
          <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
            <div className="text-sm font-black text-dark">₹{item.value / 1000}k</div>
            <div
              className="w-full rounded-t-xl bg-primary shadow-lg shadow-orange-200 transition hover:bg-orange-600"
              style={{ height: `${(item.value / maxRevenue) * 220}px` }}
            />
            <div className="font-black text-gray-500">{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Revenue;
