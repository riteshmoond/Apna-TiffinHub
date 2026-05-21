import { useEffect, useMemo, useState } from "react";
import { createOrder } from "../lib/publicApi";
import { getUserToken } from "../lib/userAuth";

const today = new Date().toISOString().split("T")[0];

const defaultOrder = {
  customer: "",
  phone: "",
  address: "",
  plan: "Basic Veg Plan",
  amount: 60,
  quantity: 1,
  mealTime: "Lunch",
  deliveryDate: today,
  paymentMode: "Cash on Delivery",
  instructions: "",
};

const planPrices = {
  "Basic Veg Plan": 60,
  "Premium Plan": 90,
  "Office Lunch": 80,
};

const mealTimes = ["Lunch", "Dinner", "Both"];
const paymentModes = ["Cash on Delivery", "UPI", "Pay on WhatsApp"];

const OrderModal = ({ isOpen, onClose, selectedPlan, user, onOrderPlaced }) => {
  const [form, setForm] = useState(defaultOrder);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultAddress =
    user?.address || user?.addresses?.find((item) => item.isDefault)?.address || "";

  const total = useMemo(() => Number(form.amount) * Number(form.quantity || 1), [form.amount, form.quantity]);

  useEffect(() => {
    if (!isOpen) return;

    const plan = selectedPlan?.name || defaultOrder.plan;
    const amount = selectedPlan?.amount || planPrices[plan] || defaultOrder.amount;
    setForm((current) => ({
      ...current,
      customer: user?.name || current.customer,
      phone: user?.phone || current.phone,
      address: defaultAddress || current.address,
      plan,
      amount,
      deliveryDate: current.deliveryDate || today,
    }));
    setStatus({ type: "", text: "" });
  }, [isOpen, selectedPlan, user]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const updateForm = (field, value) => {
    setForm((current) => {
      if (field === "plan") {
        return { ...current, plan: value, amount: planPrices[value] || current.amount };
      }

      return { ...current, [field]: value };
    });
    setStatus({ type: "", text: "" });
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", text: "" });

    try {
      await createOrder(
        {
          customer: form.customer,
          phone: form.phone,
          address: form.address,
          plan: form.plan,
          amount: total,
          quantity: Number(form.quantity),
          mealTime: form.mealTime,
          deliveryDate: form.deliveryDate,
          paymentMode: form.paymentMode,
          instructions: form.instructions,
          time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        getUserToken()
      );

      setStatus({
        type: "success",
        text: "Order placed successfully. Tracking open ho raha hai.",
      });
      setForm(defaultOrder);
      window.setTimeout(() => {
        onOrderPlaced?.();
      }, 700);
    } catch (error) {
      setStatus({
        type: "error",
        text: error.message || "Order submit failed. Backend server check karo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-black/50 px-4 py-4 lg:px-8 lg:py-8">
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl lg:max-h-[calc(100dvh-4rem)]">
        <div className="grid max-h-[inherit] overflow-y-auto lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="bg-dark p-6 text-white lg:sticky lg:top-0 lg:max-h-[inherit] lg:overflow-y-auto">
              <div className="flex items-start justify-between gap-4 lg:block">
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-orange-200">Order summary</div>
                  <h2 className="mt-3 text-3xl font-black">Royal Tiffin Service</h2>
                  <p className="mt-3 leading-7 text-gray-300">Fresh homemade tiffin delivered to your doorstep.</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-xl font-black lg:hidden"
                  aria-label="Close order form"
                >
                  x
                </button>
              </div>

              <div className="mt-8 space-y-4 rounded-xl bg-white/10 p-5">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-300">Plan</span>
                  <span className="font-black">{form.plan}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-300">Per meal</span>
                  <span className="font-black">₹{form.amount}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-300">Quantity</span>
                  <span className="font-black">{form.quantity}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-gray-300">Total</span>
                    <span className="text-4xl font-black text-orange-200">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {["Fresh food", "Hygienic packing", "Fast delivery", "Admin tracking"].map((item) => (
                  <div key={item} className="rounded-xl bg-white/10 p-3 font-bold text-gray-200">
                    {item}
                  </div>
                ))}
              </div>
            </aside>

            <section className="p-6 lg:min-h-0 lg:overflow-y-auto">
              <div className="hidden items-start justify-between gap-4 lg:flex">
                <div>
                  <div className="section-kicker">Place order</div>
                  <h2 className="mt-2 text-3xl font-black text-dark">Complete Your Tiffin Order</h2>
                  <p className="mt-2 font-semibold text-gray-500">Details fill karo, order admin dashboard me save hoga.</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-xl font-black text-dark"
                  aria-label="Close order form"
                >
                  x
                </button>
              </div>

              <form onSubmit={submitOrder} className="mt-6 space-y-5">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-gray-500">Customer Details</h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <input
                      value={form.customer}
                      onChange={(event) => updateForm("customer", event.target.value)}
                      placeholder="Full name"
                      className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                      required
                    />
                    <input
                      value={form.phone}
                      onChange={(event) => updateForm("phone", event.target.value)}
                      placeholder="Phone number"
                      className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <textarea
                    value={form.address}
                    onChange={(event) => updateForm("address", event.target.value)}
                    placeholder="Full delivery address"
                    rows="3"
                    className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-gray-500">Meal Details</h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <select
                      value={form.plan}
                      onChange={(event) => updateForm("plan", event.target.value)}
                      className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                    >
                      {Object.keys(planPrices).map((plan) => (
                        <option key={plan} value={plan}>
                          {plan}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={form.quantity}
                      onChange={(event) => updateForm("quantity", event.target.value)}
                      placeholder="Quantity"
                      className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                    />
                    <select
                      value={form.mealTime}
                      onChange={(event) => updateForm("mealTime", event.target.value)}
                      className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                    >
                      {mealTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      min={today}
                      value={form.deliveryDate}
                      onChange={(event) => updateForm("deliveryDate", event.target.value)}
                      className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-gray-500">Payment & Notes</h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <select
                      value={form.paymentMode}
                      onChange={(event) => updateForm("paymentMode", event.target.value)}
                      className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                    >
                      {paymentModes.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                    <input
                      value={`Total: ₹${total}`}
                      readOnly
                      className="rounded-xl border border-orange-100 bg-cream px-4 py-3 font-black text-primary outline-none"
                    />
                  </div>
                  <textarea
                    value={form.instructions}
                    onChange={(event) => updateForm("instructions", event.target.value)}
                    placeholder="Any instruction? Less spicy, no onion, delivery timing..."
                    rows="2"
                    className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary px-5 py-4 font-black text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Placing Order..." : `Place Order - ₹${total}`}
                </button>

                {status.text && (
                  <div
                    className={`rounded-xl px-4 py-3 text-sm font-bold ${
                      status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                    }`}
                  >
                    {status.text}
                  </div>
                )}
              </form>
            </section>
          </div>
        </div>
    </div>
  );
};

export default OrderModal;
