import { useEffect, useMemo, useState } from "react";
import { orders as initialOrders } from "./data";
import StatusBadge from "./StatusBadge";
import { api } from "./api";

const statuses = ["Pending", "Preparing", "Delivered"];

const phoneDigits = (phone = "") => phone.replace(/\D/g, "");

const Detail = ({ label, value }) => (
  <div className="rounded-xl bg-slate-50 p-4">
    <div className="text-xs font-black uppercase tracking-wide text-gray-500">{label}</div>
    <div className="mt-1 font-bold text-dark">{value || "N/A"}</div>
  </div>
);

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .getOrders()
      .then((items) => {
        setOrders(items);
        setSelectedId(items[0]?._id || items[0]?.id || null);
      })
      .catch(() => {
        setOrders(initialOrders);
        setSelectedId(initialOrders[0]?.id || null);
      });
  }, []);

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) =>
        `${order.customer} ${order.phone || ""} ${order.plan} ${order.status}`.toLowerCase().includes(query.toLowerCase())
      ),
    [orders, query]
  );

  const selectedOrder =
    orders.find((order) => (order._id || order.id) === selectedId) || filteredOrders[0] || null;

  const updateStatus = async (id, status) => {
    const previousOrders = orders;
    setMessage("");
    setOrders((current) =>
      current.map((order) => ((order._id || order.id) === id ? { ...order, status } : order))
    );

    if (id.startsWith("ORD-")) return;

    try {
      const updatedOrder = await api.updateOrderStatus(id, status);
      setOrders((current) => current.map((order) => (order._id === id ? updatedOrder : order)));
      setMessage(`Order marked as ${status}.`);
    } catch (error) {
      setOrders(previousOrders);
      setMessage(error.message || "Status update failed");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-dark">Order Queue</h2>
            <p className="mt-1 font-semibold text-gray-500">Search, select, and manage live orders.</p>
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search orders..."
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
          />
        </div>

        <div className="mt-6 space-y-3">
          {filteredOrders.map((order) => {
            const id = order._id || order.id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedId(id)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  selectedOrder && (selectedOrder._id || selectedOrder.id) === id
                    ? "border-primary bg-orange-50"
                    : "border-gray-100 bg-white hover:border-primary"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase text-primary">#{order.id || order._id?.slice(-6)}</div>
                    <div className="mt-1 text-lg font-black text-dark">{order.customer}</div>
                    <div className="mt-1 text-sm font-semibold text-gray-500">{order.plan}</div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={order.status} />
                    <div className="mt-2 font-black text-primary">₹{order.amount}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        {message && <div className="mb-4 rounded-xl bg-orange-50 p-3 text-sm font-bold text-dark">{message}</div>}

        {!selectedOrder ? (
          <div className="rounded-xl bg-slate-50 p-6 text-center font-bold text-gray-600">Order select karo.</div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm font-black uppercase text-primary">Order #{selectedOrder.id || selectedOrder._id?.slice(-6)}</div>
                <h2 className="mt-2 text-3xl font-black text-dark">{selectedOrder.customer}</h2>
                <p className="mt-1 font-semibold text-gray-500">{selectedOrder.plan}</p>
              </div>
              <div className="text-left sm:text-right">
                <StatusBadge status={selectedOrder.status} />
                <div className="mt-2 text-3xl font-black text-primary">₹{selectedOrder.amount}</div>
              </div>
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(selectedOrder._id || selectedOrder.id, status)}
                  className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                    selectedOrder.status === status
                      ? "bg-primary text-white"
                      : "border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Detail label="Phone" value={selectedOrder.phone} />
              <Detail label="Meal Time" value={selectedOrder.mealTime || "Lunch"} />
              <Detail label="Quantity" value={selectedOrder.quantity || 1} />
              <Detail label="Delivery Date" value={selectedOrder.deliveryDate || selectedOrder.time} />
              <Detail label="Payment Mode" value={selectedOrder.paymentMode || "Cash on Delivery"} />
              <Detail label="Placed At" value={selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString("en-IN") : selectedOrder.time} />
            </div>

            <div className="mt-3">
              <Detail label="Address" value={selectedOrder.address} />
            </div>

            <div className="mt-3">
              <Detail label="Instructions" value={selectedOrder.instructions || "No special instructions"} />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${phoneDigits(selectedOrder.phone)}`}
                className="rounded-xl bg-dark px-5 py-3 text-center font-black text-white"
              >
                Call Customer
              </a>
              <a
                href={`https://wa.me/91${phoneDigits(selectedOrder.phone).slice(-10)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green px-5 py-3 text-center font-black text-white"
              >
                WhatsApp Customer
              </a>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Orders;
