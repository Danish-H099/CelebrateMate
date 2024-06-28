// routes.js

const express = require("express");
const router = express.Router();
const collection = require("../models/User"); // Adjust the path based on your MongoDB setup


// POST (Form Login Page)/
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await collection.findOne({ email: email });
        console.log(user);
        if (user) {
            // Check if the password matches
            if (password === user.password) {
                // Password is correct, send back name and status
                res.json({ status: "exist", name: user.name });
            } else {
                // Password is incorrect
                res.json({ status: "wrongpassword" });
            }
        } else {
            // User does not exist
            res.json({ status: "notexist" });
        }
    } catch (e) {
        // Error handling
        console.error(e);
        res.json({ status: "fail" });
    }
});



// POST /signup
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const data = {
        name: name,
        email: email,
        password: password,
    };
    console.log(data);
    try {
        const check = await collection.findOne({ email: email });
        console.log(check);
        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
            await collection.insertMany([data]);
        }
    } catch (e) {
        res.json("fail");
    }
});

module.exports = router;
