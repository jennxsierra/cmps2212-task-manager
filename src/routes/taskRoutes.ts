import express from "express";
import {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

// GET / -> Get all tasks
router.get("/", getTasks);

// POST /add-task -> Add a new task
router.post("/add-task", addTask);

// POST /toggle-task/:id -> Toggle task completion
router.post("/toggle-task/:id", toggleTask);

// POST /delete-task/:id -> Delete a task
router.post("/delete-task/:id", deleteTask);

export default router;
