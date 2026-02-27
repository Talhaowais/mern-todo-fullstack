const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* ---------- MONGODB CONNECTION ---------- */

console.log("URI preview:", process.env.MONGO_URI?.slice(0, 20) + "...");

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,  // Increased for Atlas
    maxPoolSize: 10,  // Add connection pool
    socketTimeoutMS: 45000,
    family: 4,
    bufferCommands: false
  })
  .then(() => console.log("✅ MongoDB Connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("Full error:", err);  // Log full error
    process.exit(1);
  });

/* ---------- ROUTES ---------- */

// Create Todo
app.post("/todos", async (req, res) => {
  try {
    if (!req.body.task) {
      return res.status(400).json({ error: "Task cannot be empty" });
    }

    const todo = await Todo.create({ task: req.body.task });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Todo
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Todo
app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task: req.body.task },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ---------- START SERVER ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));