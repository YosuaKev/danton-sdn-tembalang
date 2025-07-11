import { Router } from "express";
const router = Router();
import {
  createGaleri,
  getAllGaleri,
  getGaleriById,
  updateGaleri,
  deleteGaleri
} from "../controllers/galeri.controller.js";
import validateGaleri from "../middleware/validate.galeri.js";
import { verifyToken } from "../middleware/auth.middleware.js";

// Create new gallery entry (Admin only)
router.post("/", verifyToken, validateGaleri, createGaleri);

// Get all gallery entries (Public)
router.get("/", getAllGaleri);

// Get single gallery entry (Public)
router.get("/:id", getGaleriById);

// Update gallery entry (Admin only)
router.put("/:id", verifyToken, validateGaleri, updateGaleri);

// Delete gallery entry (Admin only)
router.delete("/:id", verifyToken, deleteGaleri);

export default router;