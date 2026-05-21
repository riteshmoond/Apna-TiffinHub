import express from "express";
import { createGalleryItem, deleteGalleryItem, getGallery, updateGalleryItem } from "../controllers/galleryController.js";
import { adminProtect } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getGallery);
router.post("/", adminProtect, createGalleryItem);
router.put("/:id", adminProtect, updateGalleryItem);
router.delete("/:id", adminProtect, deleteGalleryItem);

export default router;
