const reviews = [
  ["Amit Sharma", "Best ghar jaisa khana in Jaipur. Taste and hygiene both are excellent."],
  ["Priya Singh", "Delivery always on time. Monthly plan is perfect for PG students."],
  ["Rahul Verma", "Affordable, fresh, and very filling lunch for office days."],
];

const Reviews = () => {
  return (
    <section className="bg-white py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Testimonials</span>
          <h2 className="section-title mt-3">Loved By Daily Customers</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map(([name, text]) => (
            <div key={name} className="rounded-xl border border-orange-100 bg-cream p-6 shadow-sm">
              <div className="text-lg text-primary">★★★★★</div>
              <p className="mt-5 leading-8 text-gray-700">"{text}"</p>
              <div className="mt-6 font-black text-dark">- {name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
