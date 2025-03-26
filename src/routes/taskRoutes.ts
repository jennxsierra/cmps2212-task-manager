import express from "express";
import {
  getTasks,
  addTaskController,
  toggleTaskController,
  deleteTaskController,
} from "../controllers/taskController";

const router = express.Router();

// GET / -> Get all tasks
router.get("/", getTasks);

// POST /add-task -> Add a new task
router.post("/add-task", addTaskController);

// PATCH /tasks/:id -> Toggle task completion
router.patch("/tasks/:id", toggleTaskController);

// DELETE /tasks/:id -> Delete a task
router.delete("/tasks/:id", deleteTaskController);

export default router;
