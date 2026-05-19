import { useEffect, useState } from "react";
import { cancelMyOrder, getMyOrders } from "../lib/publicApi";
import { getUserToken } from "../lib/userAuth";

const steps = [
  { label: "Pending", hint: "Order received" },
  { label: "Preparing", hint: "Kitchen started" },
  { label: "Out for Delivery", hint: "On the way" },
  { label: "Delivered", hint: "Completed" },
];

const statusClasses = {
  Pending: "bg-amber-100 text-amber-700",
  Preparing: "bg-blue-100 text-blue-700",
  "Out for Delivery": "bg-violet-100 text-violet-700",
  Delivered: "bg-emerald-100 text-emerald-700",
};

const StatusPill = ({ status }) => (
  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusClasses[status] || "bg-gray-100 text-gray-700"}`}>
    {status || "Pending"}
  </span>
);

const DetailRow = ({ label, value }) => (
  <div className="rounded-xl bg-cream p-3">
    <div className="text-xs font-black uppercase tracking-wide text-gray-500">{label}</div>
    <div className="mt-1 font-bold text-dark">{value || "N/A"}</div>
  </div>
);

const MyOrdersModal = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadOrders = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const data = await getMyOrders(getUserToken());
      setOrders(data);
      setSelectedOrder((current) => data.find((order) => order._id === current?._id) || data[0] || null);
    } catch (error) {
      setMessage(error.message || "Orders load failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadOrders();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const cancelOrder = async (order) => {
    try {
      await cancelMyOrder(order._id, getUserToken());
      setMessage("Order cancelled successfully.");
      await loadOrders();
    } catch (error) {
      setMessage(error.message || "Cancel order failed");
    }
  };

  const activeIndex = selectedOrder
    ? Math.max(0, steps.findIndex((step) => step.label === selectedOrder.status))
    : 0;

  return (
    <div className="fixed inset-0 z-[85] grid place-items-center overflow-hidden bg-black/50 px-4 py-4 lg:px-8 lg:py-8">
      <div className="flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white p-5 shadow-2xl sm:p-6 lg:max-h-[calc(100dvh-4rem)] lg:p-8">
        <div className="flex shrink-0 items-start justify-between gap-4">
          <div>
            <div className="section-kicker">Track orders</div>
            <h2 className="mt-2 text-3xl font-black text-dark">My Orders</h2>
            <p className="mt-2 font-semibold text-gray-500">Receipt, status tracking, aur pending cancellation yahin milega.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={loadOrders} className="rounded-xl bg-cream px-4 py-2 text-sm font-black text-primary">
              Refresh
            </button>
            <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-xl font-black text-dark">
              x
            </button>
          </div>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 gap-6 overflow-y-auto pr-1 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-3 lg:max-h-full lg:overflow-y-auto lg:pr-1">
            {isLoading && <div className="rounded-xl bg-cream p-4 font-bold text-dark">Loading orders...</div>}
            {orders.length === 0 && !isLoading && (
              <div className="rounded-xl bg-cream p-6 text-center font-bold text-gray-600">Abhi koi order nahi hai.</div>
            )}
            {orders.map((order) => (
              <button
                key={order._id}
                type="button"
                onClick={() => setSelectedOrder(order)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  selectedOrder?._id === order._id ? "border-primary bg-orange-50" : "border-orange-100 bg-white hover:border-primary"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-black uppercase text-primary">#{order._id.slice(-6)}</div>
                    <div className="mt-1 font-black text-dark">{order.plan}</div>
                    <div className="mt-1 text-sm font-semibold text-gray-500">
                      {order.mealTime || "Lunch"} | Qty {order.quantity || 1}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-primary">₹{order.amount}</div>
                    <div className="mt-1">
                      <StatusPill status={order.status} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </aside>

          <section className="min-h-0 rounded-xl border border-orange-100 p-5 lg:max-h-full lg:overflow-y-auto">
            {message && <div className="mb-4 rounded-xl bg-orange-50 p-3 text-sm font-bold text-dark">{message}</div>}

            {!selectedOrder ? (
              <div className="rounded-xl bg-cream p-6 text-center font-bold text-gray-600">Order select karo.</div>
            ) : (
              <>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-black uppercase text-primary">Receipt #{selectedOrder._id.slice(-6)}</div>
                    <h3 className="mt-2 text-2xl font-black text-dark">{selectedOrder.plan}</h3>
                    <p className="mt-1 font-semibold text-gray-500">
                      Placed on {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-3xl font-black text-primary">₹{selectedOrder.amount}</div>
                    <div className="mt-1 text-sm font-bold text-gray-500">{selectedOrder.paymentMode || "Cash on Delivery"}</div>
                    <div className="mt-3">
                      <StatusPill status={selectedOrder.status} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.label}
                      className={`rounded-xl border px-4 py-3 ${
                        index <= activeIndex
                          ? "border-green bg-green text-white"
                          : "border-gray-100 bg-gray-50 text-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${
                            index <= activeIndex ? "bg-white text-green" : "bg-white text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="min-w-0 text-left">
                          <span className="block text-sm font-black">{step.label}</span>
                          <span className={`mt-0.5 block text-xs font-bold ${index <= activeIndex ? "text-white/80" : "text-gray-400"}`}>
                            {step.hint}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DetailRow label="Customer" value={selectedOrder.customer} />
                  <DetailRow label="Phone" value={selectedOrder.phone} />
                  <DetailRow label="Meal Time" value={selectedOrder.mealTime || "Lunch"} />
                  <DetailRow label="Delivery Date" value={selectedOrder.deliveryDate || "Today"} />
                  <DetailRow label="Quantity" value={selectedOrder.quantity || 1} />
                  <DetailRow label="Status" value={selectedOrder.status} />
                </div>

                <div className="mt-3">
                  <DetailRow label="Delivery Address" value={selectedOrder.address} />
                </div>

                {selectedOrder.instructions && (
                  <div className="mt-3">
                    <DetailRow label="Instructions" value={selectedOrder.instructions} />
                  </div>
                )}

                {selectedOrder.status === "Pending" && (
                  <button
                    type="button"
                    onClick={() => cancelOrder(selectedOrder)}
                    className="mt-6 rounded-xl bg-red-50 px-5 py-3 font-black text-red-600 transition hover:bg-red-100"
                  >
                    Cancel Order
                  </button>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersModal;
