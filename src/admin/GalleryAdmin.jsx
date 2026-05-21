import { useEffect, useState } from "react";
import { api } from "./api";

const emptyItem = {
  title: "",
  imageUrl: "",
  tag: "Fresh",
  isFeatured: false,
};

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyItem);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api.getGallery().then(setItems).catch(() => setItems([]));
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
      title: form.title.trim(),
      imageUrl: form.imageUrl.trim(),
      tag: form.tag.trim() || "Fresh",
      isFeatured: Boolean(form.isFeatured),
    };

    try {
      if (editingId) {
        const updated = await api.updateGalleryItem(editingId, payload);
        setItems((current) => current.map((item) => (item._id === editingId ? updated : item)));
        setMessage("Gallery item updated.");
      } else {
        const created = await api.createGalleryItem(payload);
        setItems((current) => [created, ...current]);
        setMessage("Gallery item added.");
      }
      resetForm();
    } catch (error) {
      setMessage(error.message || "Save failed");
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      imageUrl: item.imageUrl || "",
      tag: item.tag || "Fresh",
      isFeatured: Boolean(item.isFeatured),
    });
  };

  const removeItem = async (id) => {
    try {
      await api.deleteGalleryItem(id);
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
            <h2 className="text-2xl font-black text-dark">Gallery Manager</h2>
            <p className="mt-1 font-semibold text-gray-500">Add food photos and tags for the homepage gallery.</p>
          </div>
          {message && <div className="rounded-xl bg-orange-50 px-4 py-2 text-sm font-bold text-dark">{message}</div>}
        </div>

        <form onSubmit={submitItem} className="mt-6 grid gap-4 lg:grid-cols-3">
          <input
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder="Title (Rajma Masala)"
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
            required
          />
          <input
            value={form.tag}
            onChange={(event) => updateForm("tag", event.target.value)}
            placeholder="Tag (Fresh/Hot)"
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
          />
          <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-600">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(event) => updateForm("isFeatured", event.target.checked)}
            />
            Featured
          </label>
          <input
            value={form.imageUrl}
            onChange={(event) => updateForm("imageUrl", event.target.value)}
            placeholder="Image URL"
            className="rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary lg:col-span-3"
            required
          />

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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="h-44">
              <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-black text-dark">{item.title}</div>
                <div className="text-xs font-black text-primary">{item.tag || "Fresh"}</div>
              </div>
              {item.isFeatured && (
                <div className="mt-2 text-xs font-black text-emerald-600">Featured</div>
              )}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;
