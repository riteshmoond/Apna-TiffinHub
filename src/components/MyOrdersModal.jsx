import { useEffect, useState } from "react";
import { getMyOrders } from "../lib/publicApi";
import { getUserToken } from "../lib/userAuth";

const steps = ["Pending", "Preparing", "Delivered"];

const MyOrdersModal = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadOrders = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const data = await getMyOrders(getUserToken());
      setOrders(data);
    } catch (error) {
      setMessage(error.message || "Orders load failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadOrders();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[85] overflow-y-auto bg-black/50 px-4 py-6">
      <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="section-kicker">Track orders</div>
            <h2 className="mt-2 text-3xl font-black text-dark">My Orders</h2>
            <p className="mt-2 font-semibold text-gray-500">Admin status update karega to yahin track hoga.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={loadOrders}
              className="rounded-xl bg-cream px-4 py-2 text-sm font-black text-primary"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-xl font-black text-dark"
            >
              x
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {isLoading && <div className="rounded-xl bg-cream p-4 font-bold text-dark">Loading orders...</div>}
          {message && <div className="rounded-xl bg-red-50 p-4 font-bold text-red-600">{message}</div>}
          {!isLoading && !message && orders.length === 0 && (
            <div className="rounded-xl bg-cream p-6 text-center font-bold text-gray-600">
              Abhi koi order nahi hai.
            </div>
          )}

          {orders.map((order) => {
            const activeIndex = Math.max(0, steps.indexOf(order.status));

            return (
              <div key={order._id} className="rounded-xl border border-orange-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-black uppercase text-primary">#{order._id.slice(-6)}</div>
                    <h3 className="mt-1 text-xl font-black text-dark">{order.plan}</h3>
                    <p className="mt-1 font-semibold text-gray-500">
                      {order.mealTime || "Lunch"} • Qty {order.quantity || 1} • {order.deliveryDate || "Today"}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl font-black text-primary">₹{order.amount}</div>
                    <div className="mt-1 text-sm font-bold text-gray-500">{order.paymentMode || "Cash on Delivery"}</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {steps.map((step, index) => (
                    <div
                      key={step}
                      className={`rounded-xl px-4 py-3 text-center text-sm font-black ${
                        index <= activeIndex ? "bg-green text-white" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>

                {order.instructions && (
                  <div className="mt-4 rounded-xl bg-cream p-3 text-sm font-semibold text-gray-600">
                    Note: {order.instructions}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersModal;
