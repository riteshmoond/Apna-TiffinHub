import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const signToken = (admin) =>
  jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "7d",
  });

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const configuredEmail = process.env.ADMIN_EMAIL || "admin@royaltiffin.com";
  const configuredPassword = process.env.ADMIN_PASSWORD || "admin123";

  let admin = await Admin.findOne({ email: email.toLowerCase() });

  if (!admin && email.toLowerCase() === configuredEmail.toLowerCase()) {
    const hashedPassword = await bcrypt.hash(configuredPassword, 10);
    admin = await Admin.create({
      email: configuredEmail,
      password: hashedPassword,
      name: "Royal Admin",
    });
  }

  if (!admin) {
    return res.status(401).json({ message: "Invalid admin email or password" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid admin email or password" });
  }

  res.json({
    token: signToken(admin),
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
};
