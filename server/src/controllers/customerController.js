import Customer from "../models/Customer.js";

export const getCustomers = async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
};
