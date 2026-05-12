import React from "react";
import heroImage from "../assets/hero.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-[60vh] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-green-dark bg-opacity-70 rounded-xl"></div>
      <div className="relative z-10 flex flex-col items-center text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Healthy Homemade Food Delivered Daily</h1>
        <p className="text-lg md:text-xl mb-6">Ghar Jaisa Healthy Khana | Daily Fresh Meals | Monthly Subscription | Free Delivery</p>
        <div className="flex flex-col md:flex-row gap-4">
          <a href="#plans" className="bg-orange text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-orange-600 transition">Order Now</a>
          <a href="#menu" className="bg-white text-orange px-6 py-3 rounded-xl font-semibold shadow hover:bg-orange-100 transition">View Menu</a>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="bg-green-dark text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-900 transition">WhatsApp Order</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
