import CatalogItem from "../models/CatalogItem.js";

export const getCatalog = async (req, res) => {
  const items = await CatalogItem.find().sort({ category: 1, name: 1 });
  res.json(items);
};

export const createCatalogItem = async (req, res) => {
  const item = await CatalogItem.create(req.body);
  res.status(201).json(item);
};

export const updateCatalogItem = async (req, res) => {
  const item = await CatalogItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
};

export const deleteCatalogItem = async (req, res) => {
  const item = await CatalogItem.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  await item.deleteOne();
  res.json({ message: "Item deleted" });
};
