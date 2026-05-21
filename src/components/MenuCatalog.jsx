import { useEffect, useMemo, useState } from "react";
import { getCatalog } from "../lib/publicApi";

const fallbackImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

const MenuCatalog = ({ onOrder }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCatalog()
      .then(setItems)
      .catch((err) => setError(err.message || "Menu load failed"));
  }, []);

  const grouped = useMemo(() => {
    return items.reduce((acc, item) => {
      const key = item.category || "Specials";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [items]);

  const categories = Object.keys(grouped);

  return (
    <section id="catalog" className="bg-white py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Today menu</span>
          <h2 className="section-title mt-3">Full Menu, Combos, and Add-ons</h2>
          <p className="mt-3 font-semibold text-gray-500">
            Fresh kitchen specials with photos. Order anything as per your mood.
          </p>
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        <div className="mt-12 space-y-10">
          {categories.length === 0 && !error && (
            <div className="rounded-xl bg-cream p-6 text-center font-bold text-gray-600">
              Menu coming soon.
            </div>
          )}
          {categories.map((category) => (
            <div key={category} className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-dark">{category}</h3>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {grouped[category].map((item) => (
                  <div
                    key={item._id}
                    className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg shadow-orange-100/60"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={item.imageUrl || fallbackImage}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      {!item.isAvailable && (
                        <div className="absolute inset-0 grid place-items-center bg-black/50 text-sm font-black text-white">
                          Sold out
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-black text-dark">{item.name}</h4>
                          <p className="mt-1 text-sm font-semibold text-gray-500">
                            {item.description || "Freshly prepared."}
                          </p>
                        </div>
                        <div className="text-lg font-black text-primary">₹{item.price}</div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className={`text-xs font-black ${item.isAvailable ? "text-green" : "text-gray-400"}`}>
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                        <button
                          type="button"
                          disabled={!item.isAvailable}
                          onClick={() => onOrder?.({ name: item.name, amount: item.price })}
                          className="rounded-xl bg-dark px-4 py-2 text-xs font-black text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          Order now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuCatalog;
