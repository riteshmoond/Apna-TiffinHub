import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./admin/Dashboard";
import AdminLogin from "./admin/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  )
}

export default App
