import { useEffect, useState } from "react";
import { orders as initialOrders } from "./data";
import StatusBadge from "./StatusBadge";
import { api } from "./api";

const statuses = ["Pending", "Preparing", "Delivered"];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.getOrders().then(setOrders).catch(() => setOrders(initialOrders));
  }, []);

  const filteredOrders = orders.filter((order) =>
    `${order.customer} ${order.plan} ${order.status}`.toLowerCase().includes(query.toLowerCase())
  );

  const updateStatus = (id, status) => {
    const previousOrders = orders;
    setOrders((current) =>
      current.map((order) => ((order._id || order.id) === id ? { ...order, status } : order))
    );

    if (id.startsWith("ORD-")) return;
    api.updateOrderStatus(id, status).catch(() => {
      setOrders(previousOrders);
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-dark">Order List</h2>
          <p className="mt-1 font-semibold text-gray-500">Search orders and update status quickly.</p>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search orders..."
          className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
        />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left">
          <thead>
            <tr className="border-b text-sm font-black uppercase text-gray-500">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Plan</th>
              <th className="pb-3">Details</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id || order.id} className="border-b last:border-b-0">
                <td className="py-4 font-black text-primary">{order.id || order._id?.slice(-6)}</td>
                <td className="py-4 font-bold text-dark">{order.customer}</td>
                <td className="py-4 text-gray-600">{order.plan}</td>
                <td className="py-4 text-gray-600">
                  <div>{order.mealTime || "Lunch"} • Qty {order.quantity || 1}</div>
                  <div className="text-xs text-gray-400">{order.deliveryDate || order.time}</div>
                </td>
                <td className="py-4"><StatusBadge status={order.status} /></td>
                <td className="py-4">
                  <div className="flex gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(order._id || order.id, status)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-black text-gray-600 transition hover:border-primary hover:text-primary"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
