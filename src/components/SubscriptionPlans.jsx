const offers = [
  ["Weekly", "₹500", "7 balanced meals with flexible delivery timing"],
  ["Monthly", "₹2200", "Best value for students and working bachelors"],
  ["Referral", "Free meal", "Invite 2 friends and get 1 meal free"],
];

const SubscriptionPlans = () => {
  return (
    <section className="bg-dark py-20 text-white">
      <div className="container-pad">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="section-kicker">Subscription offers</span>
            <h2 className="mt-3 text-4xl font-black">Save More With Regular Meals</h2>
            <p className="mt-5 leading-8 text-gray-300">Weekly and monthly plans for people who want fresh food without daily planning.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {offers.map(([name, price, text]) => (
              <div key={name} className="rounded-xl bg-white p-5 text-dark">
                <div className="text-sm font-black uppercase text-primary">{name}</div>
                <div className="mt-3 text-3xl font-black">{price}</div>
                <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
