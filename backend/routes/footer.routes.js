// footer.routes.js
import { Router } from "express";
const router = Router();
import {
  createOrUpdateFooter,
  getFooter,
} from "../controllers/footer.controller.js";
import validateFooter from "../middleware/validate.footer.js";

// Get footer
router.get("/", getFooter);

// Create or update footer
router.post("/", validateFooter, createOrUpdateFooter);

export default router;