import { Router } from "express";
const router = Router();
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
} from "../controllers/calendar.controller.js";
import validateCalendar from "../middlewares/validate.calendar.js";

// Create event
router.post("/", validateCalendar, createEvent);

// Get all events
router.get("/", getEvents);

// Get single event
router.get("/:id", getEvent);

// Update event
router.put("/:id", validateCalendar, updateEvent);

// Delete event
router.delete("/:id", deleteEvent);

export default router;