// footer.controller.js
import Footer from "../models/footer.model.js";

// Create or update footer (since there's typically only one footer)
export async function createOrUpdateFooter(req, res) {
  try {
    // Assuming we only have one footer document with a fixed ID
    const footer = await Footer.findOneAndUpdate(
      {}, // empty filter to find first document
      req.body,
      { 
        new: true,
        upsert: true // create if doesn't exist
      }
    );
    res.status(200).json(footer);
  } catch (err) {
    res.status(500).json({ error: "Failed to update footer." });
  }
}

// Get footer
export async function getFooter(req, res) {
  try {
    const footer = await Footer.findOne({});
    if (!footer) {
      return res.status(404).json({ error: "Footer not found." });
    }
    res.json(footer);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch footer." });
  }
}