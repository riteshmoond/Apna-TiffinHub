import { useEffect, useState } from "react";
import { api } from "./api";
import { meals as initialMeals } from "./data";

const emptyMeal = { title: "", price: "", category: "", description: "" };

const Meals = () => {
  const [meals, setMeals] = useState(initialMeals);
  const [form, setForm] = useState(emptyMeal);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .getMeals()
      .then((items) => {
        setMeals(items.map((item) => ({ ...item, price: `₹${item.price}` })));
      })
      .catch(() => setMeals(initialMeals));
  }, []);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const addMeal = async (event) => {
    event.preventDefault();
    if (!form.title || !form.price) return;

    try {
      const savedMeal = await api.createMeal({
        ...form,
        price: Number(String(form.price).replace(/[^\d]/g, "")),
      });
      setMeals((current) => [{ ...savedMeal, price: `₹${savedMeal.price}` }, ...current]);
      setForm(emptyMeal);
      setMessage("Meal saved in MongoDB.");
    } catch (error) {
      setMessage(error.message || "Meal save failed. Login again and check backend server.");
    }
  };

  const deleteMeal = async (meal) => {
    if (!meal._id) {
      setMessage("Mock meal cannot be deleted from MongoDB.");
      return;
    }

    try {
      await api.deleteMeal(meal._id);
      setMeals((current) => current.filter((item) => item._id !== meal._id));
      setMessage("Meal deleted from MongoDB.");
    } catch (error) {
      setMessage(error.message || "Delete failed. Login again and check backend server.");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={addMeal} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-2xl font-black text-dark">Add Meal</h2>
        <div className="mt-6 space-y-4">
          {[
            ["title", "Title"],
            ["price", "Price"],
            ["category", "Category"],
            ["description", "Description"],
          ].map(([field, label]) => (
            <input
              key={field}
              value={form[field]}
              onChange={(event) => updateForm(field, event.target.value)}
              placeholder={label}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
            />
          ))}
          <button className="w-full rounded-xl bg-primary px-5 py-3 font-black text-white">Add Meal</button>
          {message && (
            <div className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-dark">
              {message}
            </div>
          )}
        </div>
      </form>

      <div className="grid gap-4">
        {meals.map((meal) => (
          <div key={meal._id || meal.title} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-primary">{meal.category}</span>
                <h3 className="mt-3 text-xl font-black text-dark">{meal.title}</h3>
                <p className="mt-2 font-semibold text-gray-600">{meal.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-primary">{meal.price}</span>
                <button
                  type="button"
                  onClick={() => deleteMeal(meal)}
                  className="rounded-xl bg-red-50 px-4 py-2 font-black text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
