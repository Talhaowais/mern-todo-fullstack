const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= GET TODOS ================= */
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= CREATE TODO ================= */
router.post("/", auth, async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task cannot be empty" });

    const newTodo = await Todo.create({
      task,
      user: req.user._id, // <-- must be ObjectId
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= UPDATE TODO ================= */
router.put("/:id", auth, async (req, res) => {
  try {
    const { task } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // <-- use ObjectId
      { task },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= DELETE TODO ================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // <-- use ObjectId
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;