const Contact = () => {
  return (
    <section id="contact" className="bg-cream py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Contact</span>
          <h2 className="section-title mt-3">Start Your Tiffin Today</h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl bg-white p-6 shadow-xl shadow-orange-100">
            {[
              ["Phone", "+91 9257479576"],
              ["Email", "info@royaltiffinservice.com"],
              ["Address", "Mansarovar, Jaipur, Rajasthan"],
              ["WhatsApp", "Order, pause, or update subscription"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-orange-100 py-5 first:pt-0 last:border-b-0">
                <div className="text-sm font-black uppercase tracking-wide text-primary">{label}</div>
                <div className="mt-2 font-bold text-dark">{value}</div>
              </div>
            ))}
            <a
              href="https://wa.me/919257479576"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-xl bg-green px-6 py-4 text-center font-black text-white transition hover:bg-emerald-600"
            >
              Order on WhatsApp
            </a>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-xl shadow-orange-100">
            <iframe
              title="Royal Tiffin Service location map"
              src="https://www.google.com/maps?q=Mansarovar%20Jaipur%20Rajasthan&output=embed"
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
