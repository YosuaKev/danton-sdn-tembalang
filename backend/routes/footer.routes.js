import { Router } from "express";
const router = Router();
import {
  getFooterContent,
  updateFooterContent,
  deleteFooterContent
} from "../controllers/footer.controller.js";
import validateFooter from "../middleware/validate.footer.js";
import { verifyToken } from "../middleware/auth.middleware.js";

// Public route
router.get("/", getFooterContent);

// Admin-only routes
router.put("/", verifyToken, validateFooter, updateFooterContent);
router.delete("/", verifyToken, deleteFooterContent);

export default router;