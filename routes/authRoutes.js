const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// 12 hours in milliseconds
const COOKIE_EXPIRATION = 12 * 60 * 60 * 1000;

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });

    // set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRATION,
      sameSite: "lax",
    });

    res.status(201).json({ message: "User signed up successfully!", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });

    // set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRATION,
      sameSite: "lax",
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout (optional)
// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;