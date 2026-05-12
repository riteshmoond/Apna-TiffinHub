import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-3 px-6 flex justify-between items-center border-b border-orange">
      <div className="text-2xl font-bold text-orange">Apna TiffinHub</div>
      <ul className="flex gap-6 text-green-dark font-medium">
        <li><a href="#home" className="hover:text-orange">Home</a></li>
        <li><a href="#menu" className="hover:text-orange">Menu</a></li>
        <li><a href="#plans" className="hover:text-orange">Plans</a></li>
        <li><a href="#about" className="hover:text-orange">About</a></li>
        <li><a href="#contact" className="hover:text-orange">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
