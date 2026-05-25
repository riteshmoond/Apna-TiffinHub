import { useEffect, useRef, useState } from "react";
import { updateUserProfile } from "../lib/userAuth";

const emptyAddress = { label: "", address: "", isDefault: false };
const MAX_AVATAR_SIZE = 450 * 1024;

const UserProfileModal = ({ isOpen, onClose, user, onUpdated, onMyOrders, onLogout }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [addresses, setAddresses] = useState([emptyAddress]);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !user) return;
    setForm({
      name: user.name || "",
      email: user.email || "",
    });
    setAvatarPreview(user.avatar || "");
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

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AVATAR_SIZE) {
      setMessage("Profile photo 450KB se chhota rakho.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(String(reader.result || ""));
      setMessage("Photo selected. Save Changes dabao.");
    };
    reader.onerror = () => setMessage("Photo read failed. Dusri image try karo.");
    reader.readAsDataURL(file);
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
        avatar: avatarPreview,
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
      <section className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#fff1e6] via-[#fff8f3] to-[#ffe4cf] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white text-xl font-black text-primary shadow">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    (user?.name || "U").slice(0, 1).toUpperCase()
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-dark text-[10px] font-black text-white shadow transition hover:scale-105"
                  aria-label="Upload profile"
                >
                  Edit
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div>
                <div className="section-kicker tracking-[0.2em]">Profile</div>
                <h2 className="mt-1 text-2xl font-bold text-dark sm:text-3xl">{user?.name || "Your Profile"}</h2>
                <p className="mt-1 text-sm font-semibold text-gray-600">Premium Member</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onMyOrders}
                className="h-11 rounded-2xl bg-dark px-4 text-sm font-black text-white transition hover:scale-[1.03]"
              >
                My Orders
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="h-11 rounded-2xl bg-white px-4 text-sm font-black text-dark ring-1 ring-gray-200 transition hover:scale-[1.03]"
              >
                Logout
              </button>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-dark ring-1 ring-gray-200 transition hover:scale-[1.03]"
              >
                x
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 text-xs font-black text-primary shadow-sm">
              {user?.phone || ""}
            </span>
            {user?.email && (
              <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 text-xs font-black text-gray-600 shadow-sm">
                {user.email}
              </span>
            )}
            <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 text-xs font-black text-emerald-700 shadow-sm">
              Address book ready
            </span>
          </div>
        </div>

        <form onSubmit={saveProfile} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Full name"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-semibold outline-none transition focus:border-primary"
              required
            />
            <input
              value={user?.phone || ""}
              readOnly
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-500 outline-none"
            />
          </div>
          <input
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
            placeholder="Email"
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-semibold outline-none transition focus:border-primary"
          />

          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Address book</div>
            <p className="text-sm font-semibold text-gray-500">Default address order form me auto-fill hoga.</p>
            {addresses.map((item, index) => (
              <div key={`${item.label}-${index}`} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-sm font-black text-dark">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-cream text-xs font-black text-primary">HOME</span>
                    <input
                      value={item.label}
                      onChange={(event) => updateAddress(index, "label", event.target.value)}
                      placeholder="Home / Office / Hostel"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold outline-none transition focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                    <label className="flex items-center gap-2 text-xs font-black text-gray-600">
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
                      className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-600 transition hover:scale-[1.03]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <textarea
                  value={item.address}
                  onChange={(event) => updateAddress(index, "address", event.target.value)}
                  placeholder="Vaishali Nagar Jaipur"
                  rows="2"
                  className="mt-3 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold outline-none transition focus:border-primary"
                  required={index === 0}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAddress}
              className="w-full rounded-2xl bg-cream px-4 py-3 text-sm font-black text-primary transition hover:scale-[1.01]"
            >
              + Add New Address
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button disabled={isSaving} className="w-full rounded-2xl bg-primary px-5 py-3 font-black text-white transition hover:scale-[1.01] disabled:opacity-60">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
          {message && <div className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-dark">{message}</div>}
        </form>
      </section>
    </div>
  );
};

export default UserProfileModal;
