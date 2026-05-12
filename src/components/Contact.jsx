import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-dark mb-10">Contact Us</h2>
        <form className="bg-orange/10 rounded-xl shadow p-8 flex flex-col gap-5">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-3 rounded-xl border border-orange/30 focus:outline-none focus:ring-2 focus:ring-orange"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-3 rounded-xl border border-orange/30 focus:outline-none focus:ring-2 focus:ring-orange"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="px-4 py-3 rounded-xl border border-orange/30 focus:outline-none focus:ring-2 focus:ring-orange"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-orange text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-orange-600 transition"
          >
            Send Message
          </button>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-dark underline text-center mt-2 hover:text-orange"
          >
            Or Order on WhatsApp
          </a>
        </form>
        <div className="text-center text-green-dark mt-8">
          <div><b>Email:</b> info@apnatiffinhub.com</div>
          <div><b>Phone:</b> +91-XXXXXXXXXX</div>
          <div><b>Location:</b> Jaipur, Rajasthan</div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
