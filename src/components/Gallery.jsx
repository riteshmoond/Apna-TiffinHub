import foodImage from "../assets/tiffin-hero.png";

const gallery = ["Veg Thali", "Paneer Meal", "Office Lunch", "Monthly Tiffin", "Healthy Bowl", "Sunday Special"];

const Gallery = () => {
  return (
    <section id="gallery" className="bg-cream py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Gallery</span>
          <h2 className="section-title mt-3">Real Food, Clean Packing</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((title) => (
            <div key={title} className="group overflow-hidden rounded-xl bg-white shadow-lg shadow-orange-100">
              <img
                src={foodImage}
                alt={title}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="flex items-center justify-between p-4">
                <span className="font-black text-dark">{title}</span>
                <span className="text-primary">Fresh</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
