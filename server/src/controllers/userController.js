import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "7d",
  });

const cleanEmail = (email) => {
  const value = String(email || "").trim().toLowerCase();
  return value || undefined;
};

const userResponse = (user, token) => ({
  token,
  user: {
    id: user._id,
    name: user.name,
    phone: user.phone,
    email: user.email || "",
    address: user.address || "",
  },
});

export const registerUser = async (req, res) => {
  const { name, phone, password, address } = req.body;
  const email = cleanEmail(req.body.email);

  if (!name || !phone || !password) {
    return res.status(400).json({ message: "Name, phone, and password are required" });
  }

  const existingPhone = await User.findOne({ phone });
  if (existingPhone) {
    return res.status(409).json({ message: "Phone already registered. Please login." });
  }

  if (email) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already registered. Please login." });
    }
  }

  const user = await User.create({
    name,
    phone,
    email,
    password,
    address: address || "",
  });

  res.status(201).json(userResponse(user, signToken(user)));
};

export const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  const user = await User.findOne({ phone });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid phone or password" });
  }

  res.json(userResponse(user, signToken(user)));
};

export const getProfile = async (req, res) => {
  res.json({ user: userResponse(req.user).user });
};

export const updateProfile = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: cleanEmail(req.body.email),
    address: req.body.address || "",
  };

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.json({ user: userResponse(user).user });
};
