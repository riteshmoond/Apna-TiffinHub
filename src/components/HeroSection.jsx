import heroImage from "../assets/tiffin-hero.png";

const HeroSection = () => {
  return (
    <section id="home" className="overflow-hidden bg-cream">
      <div className="container-pad grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <span className="section-kicker">Jaipur's trusted tiffin center</span>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.05] text-dark sm:text-6xl lg:text-7xl">
            Healthy Homemade Food Delivered To Your Door
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-gray-600">
            Fresh • Hygienic • Affordable meals for PG students, office employees,
            hostels, gym people, and working bachelors.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary px-7 py-4 text-center font-extrabold text-white shadow-xl shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Order Now
            </a>
            <a
              href="#menu"
              className="rounded-xl border border-orange-200 bg-white px-7 py-4 text-center font-extrabold text-primary shadow-sm transition hover:-translate-y-1 hover:border-primary"
            >
              View Menu
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["500+", "Meals served"],
              ["4.9", "Customer rating"],
              ["30 min", "Avg delivery"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="text-2xl font-black text-dark">{value}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-8 z-10 rounded-xl bg-white p-4 shadow-2xl shadow-orange-100">
            <div className="text-sm font-bold text-gray-500">Today's special</div>
            <div className="mt-1 text-lg font-black text-dark">Paneer Thali</div>
          </div>
          <img
            src={heroImage}
            alt="Fresh homemade Indian tiffin meal"
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-2xl shadow-orange-200"
          />
          <div className="absolute -bottom-5 right-5 rounded-xl bg-dark p-5 text-white shadow-2xl">
            <div className="text-3xl font-black">₹60</div>
            <div className="text-sm font-semibold text-orange-100">starting per meal</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
