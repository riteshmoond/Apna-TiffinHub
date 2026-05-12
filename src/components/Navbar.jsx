const navItems = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Plans", href: "#plans" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ user, onLogin, onUserLogout, onMyOrders, onProfile }) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-xl">
      <div className="container-pad flex h-20 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-xl text-white shadow-lg shadow-orange-200">
            R
          </span>
          <span>
            <span className="block text-xl font-extrabold text-dark">Royal Tiffin Service</span>
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">Fresh homemade meals</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-gray-600 transition hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm font-black text-dark sm:inline">{user.name}</span>
              <button
                type="button"
                onClick={onMyOrders}
                className="rounded-xl bg-cream px-4 py-3 text-sm font-extrabold text-primary transition hover:bg-orange-100"
              >
                My Orders
              </button>
              <button
                type="button"
                onClick={onProfile}
                className="rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-dark ring-1 ring-gray-200 transition hover:bg-gray-50"
              >
                Profile
              </button>
              <button
                type="button"
                onClick={onUserLogout}
                className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-extrabold text-dark transition hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onLogin}
              className="rounded-xl bg-dark px-4 py-3 text-sm font-extrabold text-white transition hover:bg-gray-800"
            >
              Login
            </button>
          )}
          <a
            href="https://wa.me/919257479576"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-green-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
