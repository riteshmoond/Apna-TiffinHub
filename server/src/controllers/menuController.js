import MenuItem from "../models/MenuItem.js";

export const getMenu = async (req, res) => {
  const menu = await MenuItem.find().sort({ createdAt: 1 });
  res.json(menu);
};

export const updateMenu = async (req, res) => {
  const items = req.body.items || [];

  const updatedItems = await Promise.all(
    items.map((item) =>
      MenuItem.findOneAndUpdate(
        { day: item.day },
        { day: item.day, menu: item.menu },
        { upsert: true, new: true, runValidators: true }
      )
    )
  );

  res.json(updatedItems);
};
