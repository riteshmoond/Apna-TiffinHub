import { useEffect, useState } from "react";
import { loginUser, registerUser, setUserSession } from "../lib/userAuth";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  password: "",
  address: "",
};

const UserAuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const submitAuth = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data =
        mode === "login"
          ? await loginUser({ phone: form.phone, password: form.password })
          : await registerUser(form);

      setUserSession(data);
      setForm(initialForm);
      onSuccess(data.user);
    } catch (error) {
      setError(error.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-black/50 px-4 py-4 lg:px-8 lg:py-8">
      <section className="max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-6 lg:max-h-[calc(100dvh-4rem)] lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="section-kicker">Customer account</div>
            <h2 className="mt-2 text-3xl font-black text-dark">
              {mode === "login" ? "Login to Order" : "Create Account"}
            </h2>
            <p className="mt-2 font-semibold text-gray-500">
              Order place karne ke liye account required hai.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-xl font-black text-dark"
          >
            x
          </button>
        </div>

        <form onSubmit={submitAuth} className="mt-6 space-y-4">
          {mode === "register" && (
            <>
              <input
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
                required
              />
              <input
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                placeholder="Email optional"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
              />
              <textarea
                value={form.address}
                onChange={(event) => updateForm("address", event.target.value)}
                placeholder="Default delivery address"
                rows="2"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
              />
            </>
          )}

          <input
            value={form.phone}
            onChange={(event) => updateForm("phone", event.target.value)}
            placeholder="Phone number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
            required
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => updateForm("password", event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-primary"
            required
          />

          {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</div>}

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary px-5 py-3 font-black text-white disabled:opacity-60"
          >
            {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode((current) => (current === "login" ? "register" : "login"));
            setError("");
          }}
          className="mt-5 w-full rounded-xl bg-cream px-4 py-3 text-sm font-black text-primary"
        >
          {mode === "login" ? "New user? Register here" : "Already registered? Login"}
        </button>
      </section>
    </div>
  );
};

export default UserAuthModal;
