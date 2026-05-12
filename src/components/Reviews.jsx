import React from "react";

const reviews = [
  {
    name: "Amit Sharma",
    text: "⭐️⭐️⭐️⭐️⭐️ Best ghar jaisa khana! Taste and hygiene both are top notch.",
  },
  {
    name: "Priya Singh",
    text: "⭐️⭐️⭐️⭐️⭐️ Daily fresh and hygienic food. Highly recommended for students!",
  },
  {
    name: "Rahul Verma",
    text: "⭐️⭐️⭐️⭐️⭐️ Timely delivery and very polite staff. Love the monthly plan!",
  },
  {
    name: "Sneha Patel",
    text: "⭐️⭐️⭐️⭐️⭐️ Variety in menu and home-style taste. Perfect for working professionals.",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-dark mb-10">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-orange/10 border-l-4 border-orange rounded-xl p-6 shadow flex flex-col"
            >
              <p className="text-lg text-green-dark mb-3">{review.text}</p>
              <span className="text-orange font-semibold">- {review.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
