import { useEffect, useState } from "react";
import { api } from "./api";

const emptyItem = {
  category: "",
  name: "",
  price: "",
  description: "",
  imageUrl: "",
  isAvailable: true,
};

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyItem);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api.getCatalog().then(setItems).catch(() => setItems([]));
  }, []);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const resetForm = () => {
    setForm(emptyItem);
    setEditingId(null);
  };

  const submitItem = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload = {
      category: form.category.trim(),
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      isAvailable: Boolean(form.isAvailable),
    };

    try {
      if (editingId) {
        const updated = await api.updateCatalogItem(editingId, payload);
        setItems((current) => current.map((item) => (item._id === editingId ? updated : item)));
        setMessage("Item updated.");
      } else {
        const created = await api.createCatalogItem(payload);
        setItems((current) => [created, ...current]);
        setMessage("Item added.");
      }
      resetForm();
    } catch (error) {
      setMessage(error.message || "Save failed");
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      category: item.category || "",
      name: item.name || "",
      price: item.price || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      isAvailable: Boolean(item.isAvailable),
    });
  };

  const removeItem = async (id) => {
    try {
      await api.deleteCatalogItem(id);
      setItems((current) => current.filter((item) => item._id !== id));
    } catch (error) {
      setMessage(error.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-dark">Menu Catalog</h2>
            <p className="mt-1 font-semibold text-gray-500">Add items with price, image, and availability.</p>
          </div>
          {message && <div className="rounded-xl bg-orange-50 px-4 py-2 text-sm font-bold text-dark">{message}</div>}
        </div>

        <form onSubmit={submitItem} className="mt-6 grid gap-4 lg:grid-cols-3">
          <input
            value={form.category}
            onChange={(event) => updateForm("category", event.target.value)}
            placeholder="Category (Paranthas)"
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
            required
          />
          <input
            value={form.name}
            onChange={(event) => updateForm("name", event.target.value)}
            placeholder="Item name"
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
            required
          />
          <input
            type="number"
            value={form.price}
            onChange={(event) => updateForm("price", event.target.value)}
            placeholder="Price"
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
            required
          />
          <input
            value={form.imageUrl}
            onChange={(event) => updateForm("imageUrl", event.target.value)}
            placeholder="Image URL"
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary lg:col-span-2"
          />
          <input
            value={form.description}
            onChange={(event) => updateForm("description", event.target.value)}
            placeholder="Short description"
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary lg:col-span-2"
          />
          <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-600">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(event) => updateForm("isAvailable", event.target.checked)}
            />
            Available
          </label>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-3">
            <button className="rounded-xl bg-primary px-6 py-3 font-black text-white">
              {editingId ? "Update Item" : "Add Item"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-xl bg-gray-100 px-6 py-3 font-black text-dark">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-black uppercase text-primary">{item.category}</div>
            <div className="mt-2 text-lg font-black text-dark">{item.name}</div>
            <div className="mt-1 text-sm font-semibold text-gray-500">{item.description || "No description"}</div>
            <div className="mt-3 font-black text-primary">₹{item.price}</div>
            <div className="mt-3 text-xs font-bold text-gray-500">{item.isAvailable ? "Available" : "Unavailable"}</div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => startEdit(item)}
                className="rounded-xl bg-cream px-4 py-2 text-sm font-black text-primary"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => removeItem(item._id)}
                className="rounded-xl bg-red-50 px-4 py-2 text-sm font-black text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
