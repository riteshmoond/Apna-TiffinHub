import { useEffect, useState } from "react";
import { updateUserProfile } from "../lib/userAuth";

const UserProfileModal = ({ isOpen, onClose, user, onUpdated }) => {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;
    setForm({
      name: user.name || "",
      email: user.email || "",
      address: user.address || "",
    });
    setMessage("");
  }, [isOpen, user]);

  if (!isOpen) return null;

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const data = await updateUserProfile(form);
      onUpdated(data.user);
      setMessage("Profile updated. New address next order me prefill hoga.");
    } catch (error) {
      setMessage(error.message || "Profile update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/50 px-4 py-6">
      <section className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="section-kicker">Profile</div>
            <h2 className="mt-2 text-3xl font-black text-dark">Your Details</h2>
            <p className="mt-2 font-semibold text-gray-500">Default delivery details update karo.</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-xl font-black text-dark">
            x
          </button>
        </div>

        <form onSubmit={saveProfile} className="mt-6 space-y-4">
          <input
            value={form.name}
            onChange={(event) => updateForm("name", event.target.value)}
            placeholder="Full name"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
            required
          />
          <input
            value={user?.phone || ""}
            readOnly
            className="w-full rounded-xl border border-gray-200 bg-cream px-4 py-3 font-semibold text-gray-500 outline-none"
          />
          <input
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
          />
          <textarea
            value={form.address}
            onChange={(event) => updateForm("address", event.target.value)}
            placeholder="Default delivery address"
            rows="3"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
          />
          <button disabled={isSaving} className="w-full rounded-xl bg-primary px-5 py-3 font-black text-white disabled:opacity-60">
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
          {message && <div className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-dark">{message}</div>}
        </form>
      </section>
    </div>
  );
};

export default UserProfileModal;
