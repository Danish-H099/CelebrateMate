const express = require("express");
const router = express.Router();
const Contacts = require("../models/Contacts");
const Users = require("../models/User"); // Ensure this path is correct

// GET /api/contacts - Fetch contacts for a user
router.get("/", async (req, res) => {
    console.log("get");
    const { userId } = req.query;
    try {
        const user = await Users.findOne({ email: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const contacts = await Contacts.find({ user: user._id });
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/contacts - Add a new contact
router.post("/", async (req, res) => {
    console.log("post");
    const { userId, name, dob } = req.body;
    try {
        const user = await Users.findOne({ email: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newContact = new Contacts({
            user: user._id,
            name,
            dob
        });

        const savedContact = await newContact.save();
        res.json(savedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
