const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  participants: [{ type: String }], // Store user IDs or usernames
});

module.exports = mongoose.model("Room", roomSchema);
