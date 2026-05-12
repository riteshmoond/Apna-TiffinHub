import React from "react";

// Sample images (replace with your own food images in public/assets or src/assets)
const images = [
  { src: "/src/assets/food1.jpg", alt: "Tiffin Meal 1" },
  { src: "/src/assets/food2.jpg", alt: "Tiffin Meal 2" },
  { src: "/src/assets/food3.jpg", alt: "Tiffin Meal 3" },
  { src: "/src/assets/food4.jpg", alt: "Tiffin Meal 4" },
  { src: "/src/assets/food5.jpg", alt: "Tiffin Meal 5" },
  { src: "/src/assets/food6.jpg", alt: "Tiffin Meal 6" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 bg-orange/5">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-dark mb-10">Food Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl shadow-lg bg-white">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
