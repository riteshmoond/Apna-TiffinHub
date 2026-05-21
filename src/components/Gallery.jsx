import { useEffect, useState } from "react";
import { getGallery } from "../lib/publicApi";

const fallbackImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getGallery()
      .then(setItems)
      .catch((err) => setError(err.message || "Gallery load failed"));
  }, []);

  return (
    <section id="gallery" className="bg-cream py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Gallery</span>
          <h2 className="section-title mt-3">Real Food, Clean Packing</h2>
        </div>
        {error && (
          <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </div>
        )}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 && !error && (
            <div className="col-span-full rounded-xl bg-white p-6 text-center font-bold text-gray-600">
              Gallery coming soon.
            </div>
          )}
          {items.map((item) => (
            <div key={item._id} className="group overflow-hidden rounded-xl bg-white shadow-lg shadow-orange-100">
              <img
                src={item.imageUrl || fallbackImage}
                alt={item.title}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="flex items-center justify-between p-4">
                <span className="font-black text-dark">{item.title}</span>
                <span className="text-primary">{item.tag || "Fresh"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
