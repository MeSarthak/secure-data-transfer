const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const roomRoutes = require("./routes/rooms");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json()); // Middleware to parse JSON

// Routes
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

app.get("/", (req, res) => {
  res.send("SecureShare API is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
