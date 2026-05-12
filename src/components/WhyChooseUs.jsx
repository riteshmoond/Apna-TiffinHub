const features = [
  ["🥬", "Fresh Ingredients", "Daily sourced vegetables and quality spices for real homemade taste."],
  ["⚡", "Fast Delivery", "On-time lunch and dinner delivery for offices, PGs, and hostels."],
  ["✨", "Hygienic Kitchen", "Clean cooking process, careful packing, and fresh preparation."],
  ["💚", "Affordable Prices", "Pocket-friendly daily meals and monthly subscription offers."],
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Why choose us</span>
          <h2 className="section-title mt-3">Built For Daily Trust</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([icon, title, text]) => (
            <div key={title} className="rounded-xl border border-orange-100 bg-cream p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="text-4xl">{icon}</div>
              <h3 className="mt-5 text-xl font-black text-dark">{title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
