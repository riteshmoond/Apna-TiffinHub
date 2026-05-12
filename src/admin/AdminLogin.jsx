import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setSession } from "./api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await api.login(form);
      setSession(data.token);
      navigate("/admin");
    } catch (error) {
      setError(error.message || "Backend login failed. Make sure server is running.");
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#fff7ed] px-4">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl shadow-orange-100">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-xl bg-[#ff6b00] text-2xl font-black text-white">
            R
          </div>
          <h1 className="mt-6 text-3xl font-black text-[#1f2937]">Admin Login</h1>
          <p className="mt-2 font-semibold text-gray-500">Royal Tiffin Service control panel</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
            placeholder="Admin email"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-[#ff6b00]"
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => updateForm("password", event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold outline-none focus:border-[#ff6b00]"
          />

          {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</div>}

          <button className="w-full rounded-xl bg-[#ff6b00] px-5 py-3 font-black text-white transition hover:bg-orange-600">
            Login
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-[#fff7ed] p-4 text-sm font-semibold text-gray-600">
          Admin login: admin@royaltiffin.com / admin123
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
