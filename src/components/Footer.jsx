const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="container-pad flex flex-col items-center justify-between gap-5 border-t border-orange-100 pt-8 text-center md:flex-row md:text-left">
        <div>
          <div className="text-xl font-black text-dark">Royal Tiffin Service</div>
          <div className="mt-1 text-sm font-semibold text-gray-500">Fresh • Hygienic • Affordable</div>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-sm font-bold text-gray-600">
          <a href="#home" className="hover:text-primary">Home</a>
          <a href="#menu" className="hover:text-primary">Menu</a>
          <a href="#plans" className="hover:text-primary">Plans</a>
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </div>
        <div className="text-sm font-semibold text-gray-500">© {new Date().getFullYear()} Royal Tiffin Service</div>
      </div>
    </footer>
  );
};

export default Footer;
