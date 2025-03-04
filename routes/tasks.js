// Filename: routes/tasks.js
import express from "express";
const router = express.Router();

// In-memory array to store tasks and a counter for unique IDs
let tasks = [];
let nextId = 1;

/**
 * GET /
 * Renders the main page with tasks filtered by search query,
 * task status, and sorted by priority if specified.
 */
router.get("/", (req, res) => {
  let filteredTasks = tasks;

  // Filter by search query if provided (case-insensitive)
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

  // Determine sort action based on button pressed
  const action = req.query.action || "";
  let sort = req.query.sort || "";
  if (action === "clear") {
    sort = ""; // Clear sort when the "Clear Sort" button is pressed
  }

  // Sort tasks based on priority if sort is specified,
  // otherwise sort by task ID (default order)
  const priorityMapping = { low: 1, medium: 2, high: 3 };
  if (sort === "lowToHigh") {
    filteredTasks.sort(
      (a, b) => priorityMapping[a.priority] - priorityMapping[b.priority]
    );
  } else if (sort === "highToLow") {
    filteredTasks.sort(
      (a, b) => priorityMapping[b.priority] - priorityMapping[a.priority]
    );
  } else {
    // Default sorting by task ID
    filteredTasks.sort((a, b) => a.id - b.id);
  }

  // Render the index view with the filtered tasks and query parameters
  res.render("index", {
    tasks: filteredTasks,
    q: req.query.q || "",
    filter,
    sort,
  });
});

/**
 * POST /add-task
 * Adds a new task with title, description, and priority.
 */
router.post("/add-task", (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).send("Task title is required.");
  }
  const task = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : "",
    priority: priority || "low", // Default priority is "low"
    completed: false,
  };
  tasks.push(task);
  res.redirect("/");
});

/**
 * POST /toggle-task/:id
 * Toggles the completion status of a task.
 */
router.post("/toggle-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).send("Task not found.");
  }
  task.completed = !task.completed;
  res.redirect("/");
});

/**
 * POST /delete-task/:id
 * Deletes a task by its ID.
 */
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
