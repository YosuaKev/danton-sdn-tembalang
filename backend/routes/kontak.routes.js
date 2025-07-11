import { Router } from "express";
const router = Router();
import {
  createFeedback,

} from "../controllers/kontak.controller.js";
import validateKontak from "../middleware/validate.kontak.js";


// Public routes
router.post("/", validateKontak, createFeedback);


export default router;