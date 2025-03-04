// Filename: routes/tasks.js
import express from "express";
const router = express.Router();

// In-memory array to store tasks and a counter for unique IDs
let tasks = [];
let nextId = 1;

// GET / - Render the main page with the list of tasks and add task form
router.get("/", (req, res) => {
  let filteredTasks = tasks;

  // Filter by search query if provided (ignoring case)
  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(q) ||
        (task.description && task.description.toLowerCase().includes(q))
    );
  }

  // Filter by task status if provided
  const filter = req.query.filter || "all";
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  } else if (filter === "incomplete") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  // Pass the current search query and filter to the view
  res.render("index", { tasks: filteredTasks, q: req.query.q || "", filter });
});

// POST /add-task - Add a new task
router.post("/add-task", (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).send("Task title is required.");
  }
  const task = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : "",
    completed: false,
  };
  tasks.push(task);
  res.redirect("/");
});

// POST /toggle-task/:id - Toggle the completion status of a task
router.post("/toggle-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).send("Task not found.");
  }
  task.completed = !task.completed;
  res.redirect("/");
});

// POST /delete-task/:id - Delete a task
router.post("/delete-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    return res.status(404).send("Task not found.");
  }
  tasks.splice(index, 1);
  res.redirect("/");
});

export default router;
