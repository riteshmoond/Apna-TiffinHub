import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, phone: user.phone, role: "user" }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "30d",
  });

const userResponse = (user, token) => ({
  token,
  user: {
    id: user._id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    address: user.address,
  },
});

export const registerUser = async (req, res) => {
  const { name, phone, email, password, address } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ message: "Name, phone, and password are required" });
  }

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return res.status(409).json({ message: "Phone number already registered. Please login." });
  }

  const user = await User.create({
    name,
    phone,
    email,
    address,
    password: await bcrypt.hash(password, 10),
  });

  res.status(201).json(userResponse(user, signToken(user)));
};

export const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(401).json({ message: "Invalid phone or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid phone or password" });
  }

  res.json(userResponse(user, signToken(user)));
};

export const getProfile = async (req, res) => {
  res.json({ user: req.user });
};
