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

const normalizeAddresses = (addresses = []) => {
  const cleaned = Array.isArray(addresses)
    ? addresses
        .filter((item) => item && item.address)
        .map((item) => ({
          label: String(item.label || "").trim(),
          address: String(item.address || "").trim(),
          isDefault: Boolean(item.isDefault),
        }))
    : [];

  if (cleaned.length === 0) return [];
  const hasDefault = cleaned.some((item) => item.isDefault);
  if (!hasDefault) cleaned[0].isDefault = true;
  return cleaned.map((item, index) => ({
    ...item,
    isDefault: item.isDefault || (!hasDefault && index === 0),
  }));
};

const getDefaultAddress = (user) =>
  user?.address || user?.addresses?.find((item) => item.isDefault)?.address || "";

const userResponse = (user, token) => ({
  token,
  user: {
    id: user._id,
    name: user.name,
    phone: user.phone,
    email: user.email || "",
    avatar: user.avatar || "",
    address: getDefaultAddress(user),
    addresses: user.addresses || [],
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

  const addresses = address
    ? [{ label: "Home", address, isDefault: true }]
    : [];
  const user = await User.create({
    name,
    phone,
    email,
    password,
    address: address || "",
    addresses,
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
  const hasAddresses = Object.prototype.hasOwnProperty.call(req.body, "addresses");
  const addresses = normalizeAddresses(req.body.addresses);
  const defaultAddress = addresses.find((item) => item.isDefault)?.address;
  const updates = {
    name: req.body.name,
    email: cleanEmail(req.body.email),
    avatar: String(req.body.avatar || ""),
    address: defaultAddress || req.body.address || "",
    ...(hasAddresses ? { addresses } : {}),
  };

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.json({ user: userResponse(user).user });
};
