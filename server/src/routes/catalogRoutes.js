import express from "express";
import { createCatalogItem, deleteCatalogItem, getCatalog, updateCatalogItem } from "../controllers/catalogController.js";
import { adminProtect } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getCatalog);
router.post("/", adminProtect, createCatalogItem);
router.put("/:id", adminProtect, updateCatalogItem);
router.delete("/:id", adminProtect, deleteCatalogItem);

export default router;
