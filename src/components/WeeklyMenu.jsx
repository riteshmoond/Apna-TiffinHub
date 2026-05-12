const menu = [
  ["Monday", "Dal Tadka, Rice, Roti, Aloo Jeera"],
  ["Tuesday", "Paneer Masala, Chapati, Salad"],
  ["Wednesday", "Rajma Chawal, Roti, Pickle"],
  ["Thursday", "Aloo Gobi, Dal, Rice, Roti"],
  ["Friday", "Chole, Jeera Rice, Salad, Sweet"],
  ["Saturday", "Mix Veg, Paratha, Curd"],
  ["Sunday", "Special Veg Thali with Sweet"],
];

const WeeklyMenu = () => {
  return (
    <section id="menu" className="bg-cream py-20">
      <div className="container-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Weekly menu</span>
          <h2 className="section-title mt-3">Fresh Variety Every Day</h2>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-orange-100 bg-white shadow-xl shadow-orange-100">
          {menu.map(([day, items]) => (
            <div key={day} className="grid gap-2 border-b border-orange-100 p-5 last:border-b-0 sm:grid-cols-[180px_1fr]">
              <div className="font-black text-primary">{day}</div>
              <div className="font-semibold text-gray-700">{items}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyMenu;
