import React from "react";

const menu = [
  { day: "Monday", items: "Dal, Rice, Roti" },
  { day: "Tuesday", items: "Paneer, Chapati" },
  { day: "Wednesday", items: "Rajma Chawal" },
  { day: "Thursday", items: "Aloo Gobi, Roti" },
  { day: "Friday", items: "Chole, Rice, Salad" },
  { day: "Saturday", items: "Mix Veg, Paratha" },
  { day: "Sunday", items: "Special Veg Thali" },
];

const WeeklyMenu = () => {
  return (
    <section id="menu" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-dark mb-10">Weekly Menu</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-orange/5 rounded-xl shadow">
            <thead>
              <tr>
                <th className="py-3 px-6 text-lg text-orange text-left">Day</th>
                <th className="py-3 px-6 text-lg text-green-dark text-left">Menu</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((row, idx) => (
                <tr key={idx} className="border-b last:border-none border-orange/20">
                  <td className="py-3 px-6 font-semibold text-orange">{row.day}</td>
                  <td className="py-3 px-6 text-green-dark">{row.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default WeeklyMenu;
