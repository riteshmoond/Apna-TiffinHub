import React from "react";

const plans = [
  {
    name: "Basic Veg",
    price: "₹60",
    desc: "Simple, healthy veg meal. Perfect for daily lunch/dinner.",
  },
  {
    name: "Special Thali",
    price: "₹90",
    desc: "Paneer, extra sabzi, sweet, and more variety.",
  },
  {
    name: "Monthly Plan",
    price: "₹2500",
    desc: "Best for students & working professionals. 30 meals/month.",
  },
  {
    name: "Office Lunch",
    price: "₹80",
    desc: "Quick, filling lunch for office goers.",
  },
];

const MealPlans = () => {
  return (
    <section id="plans" className="py-16 bg-orange/5">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-dark mb-10">Meal Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-orange/30 hover:shadow-2xl transition"
            >
              <div className="text-2xl font-semibold text-orange mb-2">{plan.name}</div>
              <div className="text-3xl font-bold text-green-dark mb-2">{plan.price}</div>
              <div className="text-gray-600 text-center mb-4">{plan.desc}</div>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto bg-orange text-white px-5 py-2 rounded-xl font-medium shadow hover:bg-orange-600 transition"
              >
                Order on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealPlans;
