import express from "express";
import {
  getTasks,
  addTaskController,
  toggleTaskController,
  deleteTaskController,
  renderUpdateFormController,
  updateTaskController,
} from "../controllers/taskController.js";

const router = express.Router();

// GET / -> Get all tasks
router.get("/", getTasks);

// POST /add-task -> Add a new task
router.post("/add-task", addTaskController);

// PATCH /tasks/:id -> Toggle task completion
router.patch("/tasks/:id", toggleTaskController);

// DELETE /tasks/:id -> Delete a task
router.delete("/tasks/:id", deleteTaskController);

// GET /tasks/:id/edit -> Render the update form
router.get("/tasks/:id/update", renderUpdateFormController);

// PUT /tasks/:id -> Update multiple fields of a task
router.put("/tasks/:id", updateTaskController);

export default router;
