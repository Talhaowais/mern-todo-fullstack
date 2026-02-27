// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_URL || "http://localhost:3000", // frontend origin
  credentials: true // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// Debug logger
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// Routes



// MongoDB Connection
console.log("URI preview:", process.env.MONGO_URI?.slice(0, 20) + "...");
mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));