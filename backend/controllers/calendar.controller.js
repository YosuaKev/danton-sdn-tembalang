import Calendar from "../models/calendar.model.js";

// Create new calendar event
export async function createEvent(req, res) {
  try {
    const event = new Calendar({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get all events
export async function getEvents(req, res) {
  try {
    const events = await Calendar.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
}

// Get single event
export async function getEvent(req, res) {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
}

// Update event
export async function updateEvent(req, res) {
  try {
    const event = await Calendar.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
      },
      { new: true }
    );
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete event
export async function deleteEvent(req, res) {
  try {
    const event = await Calendar.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
}