const express = require("express");
const bcrypt = require("bcryptjs");
const Room = require("../models/Room");

const router = express.Router();

// 📌 Route: Create a Secure Room
router.post("/create", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const roomId = Math.random().toString(36).substring(2, 10); // Generate unique room ID
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Set expiration (1 hour)

    const newRoom = new Room({ roomId, passwordHash: hashedPassword, expiresAt });
    await newRoom.save();

    res.status(201).json({ message: "Room created successfully", roomId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Route: Join an Existing Room
router.post("/join", async (req, res) => {
  try {
    const { roomId, password } = req.body;

    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const isPasswordValid = await bcrypt.compare(password, room.passwordHash);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ message: "Joined room successfully", roomId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
