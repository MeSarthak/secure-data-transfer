const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

// Create Room
router.post("/create", async (req, res) => {
  const { name, participants } = req.body;

  if (!name || !participants) {
    return res.status(400).json({ msg: "Please provide room name and participants" });
  }

  try {
    const newRoom = new Room({
      name,
      participants,
    });

    await newRoom.save();
    res.status(201).json({ msg: "Room created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating room" });
  }
});

// Get All Rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching rooms" });
  }
});

module.exports = router;
