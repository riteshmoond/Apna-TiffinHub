const plans = [
  {
    name: "Basic Veg Plan",
    price: "₹60",
    tag: "Daily favorite",
    items: ["4 Roti", "Sabji", "Dal", "Rice"],
  },
  {
    name: "Premium Plan",
    price: "₹90",
    tag: "Most ordered",
    items: ["Paneer", "Sweet", "Salad", "Buttermilk"],
  },
  {
    name: "Office Lunch",
    price: "₹80",
    tag: "Quick delivery",
    items: ["3 Roti", "Seasonal sabji", "Rice", "Pickle"],
  },
];

const MealPlans = () => {
  return (
    <section id="plans" className="bg-white py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Meal plans</span>
          <h2 className="section-title mt-3">Choose Your Daily Tiffin</h2>
          <p className="text-gray-600">Simple pricing, fresh food, and flexible subscription options.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="group rounded-xl border border-orange-100 bg-cream p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-100"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-primary">{plan.tag}</span>
                <span className="text-3xl">🍱</span>
              </div>
              <h3 className="mt-6 text-2xl font-black text-dark">{plan.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-black text-primary">{plan.price}</span>
                <span className="pb-1 font-bold text-gray-500">/meal</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-semibold text-gray-700">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-green text-sm text-white">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-xl bg-dark px-5 py-3 text-center font-extrabold text-white transition group-hover:bg-primary"
              >
                Subscribe
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealPlans;
