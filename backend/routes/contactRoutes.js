const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { protect } = require("../middleware/authMiddleware");

// POST: Create a new contact
router.post("/", protect, async (req, res) => {
  const { firstName, lastName, contactNumber, email } = req.body;

  try {
    const contact = new Contact({
      firstName,
      lastName,
      contactNumber,
      email,
      user: req.user._id, // Attach the user ID to the contact
    });

    const createdContact = await contact.save();
    res.status(201).json(createdContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all contacts for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch a single contact by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Ensure the contact belongs to the logged-in user
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT: Update a contact
router.put("/:id", protect, async (req, res) => {
  const { firstName, lastName, contactNumber, email } = req.body;

  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Ensure the contact belongs to the logged-in user
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    contact.firstName = firstName || contact.firstName;
    contact.lastName = lastName || contact.lastName;
    contact.contactNumber = contactNumber || contact.contactNumber;
    contact.email = email || contact.email;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE: Delete a contact
router.delete("/:id", protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Ensure the contact belongs to the logged-in user
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Contact.deleteOne({ _id: req.params.id }); // Use deleteOne for deletion

    res.json({ message: "Contact removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
