const express = require("express");
const router = express.Router();
const Friends = require("../models/Friends");
const Users = require("../models/User"); // Ensure this path is correct

// GET /api/friends - Fetch friends for a user
router.get("/", async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await Users.findOne({ email: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const friends = await Friends.find({ user: user._id });
        res.json(friends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/friends - Add a new friend
router.post("/", async (req, res) => {
    console.log("post");
    const { userId, name, dob } = req.body;
    try {
        const user = await Users.findOne({ email: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newFriend = new Friends({
            user: user._id,
            name,
            dob
        });

        const savedFriend = await newFriend.save();
        res.json(savedFriend);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
