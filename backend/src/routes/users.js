const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide both email and password" });
  }

  try {
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error registering user" });
  }
});

module.exports = router;
