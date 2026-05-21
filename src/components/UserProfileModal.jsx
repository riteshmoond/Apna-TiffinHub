import { useEffect, useState } from "react";
import { updateUserProfile } from "../lib/userAuth";

const emptyAddress = { label: "", address: "", isDefault: false };

const UserProfileModal = ({ isOpen, onClose, user, onUpdated }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [addresses, setAddresses] = useState([emptyAddress]);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;
    setForm({
      name: user.name || "",
      email: user.email || "",
    });
    if (user.addresses && user.addresses.length) {
      setAddresses(user.addresses);
    } else if (user.address) {
      setAddresses([{ label: "Home", address: user.address, isDefault: true }]);
    } else {
      setAddresses([emptyAddress]);
    }
    setMessage("");
  }, [isOpen, user]);

  if (!isOpen) return null;

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const updateAddress = (index, field, value) => {
    setAddresses((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
    setMessage("");
  };

  const addAddress = () => {
    setAddresses((current) => [...current, { ...emptyAddress }]);
  };

  const removeAddress = (index) => {
    setAddresses((current) => {
      const next = current.filter((_, itemIndex) => itemIndex !== index);
      if (next.length === 0) return [emptyAddress];
      if (!next.some((item) => item.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
  };

  const setDefaultAddress = (index) => {
    setAddresses((current) =>
      current.map((item, itemIndex) => ({
        ...item,
        isDefault: itemIndex === index,
      }))
    );
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    const cleanedAddresses = addresses
      .filter((item) => String(item.address || "").trim())
      .map((item) => ({
        label: String(item.label || "").trim(),
        address: String(item.address || "").trim(),
        isDefault: Boolean(item.isDefault),
      }));
    const hasDefault = cleanedAddresses.some((item) => item.isDefault);
    if (cleanedAddresses.length && !hasDefault) {
      cleanedAddresses[0].isDefault = true;
    }
    const defaultAddress = cleanedAddresses.find((item) => item.isDefault)?.address || "";

    try {
      const data = await updateUserProfile({
        ...form,
        address: defaultAddress,
        addresses: cleanedAddresses,
      });
      onUpdated(data.user);
      setMessage("Profile updated. New address next order me prefill hoga.");
    } catch (error) {
      setMessage(error.message || "Profile update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-black/50 px-4 py-6">
      <section className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="section-kicker">Profile</div>
            <h2 className="mt-2 text-2xl font-black text-dark sm:text-3xl">Your Details</h2>
            <p className="mt-2 font-semibold text-gray-500">Default delivery details update karo.</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-xl font-black text-dark">
            x
          </button>
        </div>

        <form onSubmit={saveProfile} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>
          <input
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
          />
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wide text-gray-500">Address book</div>
            <p className="text-sm font-semibold text-gray-500">Default address order form me auto-fill hoga.</p>
            {addresses.map((item, index) => (
              <div key={`${item.label}-${index}`} className="rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    value={item.label}
                    onChange={(event) => updateAddress(index, "label", event.target.value)}
                    placeholder="Label (Home/Office/Hostel)"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-primary"
                  />
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-600">
                    <input
                      type="radio"
                      name="default-address"
                      checked={Boolean(item.isDefault)}
                      onChange={() => setDefaultAddress(index)}
                    />
                    Default
                  </label>
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-sm font-black text-red-500 sm:ml-auto"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  value={item.address}
                  onChange={(event) => updateAddress(index, "address", event.target.value)}
                  placeholder="Full delivery address"
                  rows="2"
                  className="mt-3 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-primary"
                  required={index === 0}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAddress}
              className="w-full rounded-xl bg-cream px-4 py-2 text-sm font-black text-primary"
            >
              Add another address
            </button>
          </div>
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
