import GalleryItem from "../models/GalleryItem.js";

export const getGallery = async (req, res) => {
  const items = await GalleryItem.find().sort({ isFeatured: -1, createdAt: -1 });
  res.json(items);
};

export const createGalleryItem = async (req, res) => {
  const item = await GalleryItem.create(req.body);
  res.status(201).json(item);
};

export const updateGalleryItem = async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    return res.status(404).json({ message: "Gallery item not found" });
  }

  res.json(item);
};

export const deleteGalleryItem = async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Gallery item not found" });
  }

  await item.deleteOne();
  res.json({ message: "Gallery item deleted" });
};
