import { Request, Response } from "express";
import {
  getAllTasks,
  addTask,
  toggleTaskCompletion,
  deleteTask,
} from "../models/taskModel.js";

// Fetch all tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const searchQuery = (req.query.q as string) || "";
  const filter = (req.query.filter as string) || "all";
  const sort = (req.query.sort as string) || "";

  try {
    const tasks = await getAllTasks(searchQuery.toLowerCase(), filter, sort);
    res.render("index", {
      tasks,
      q: searchQuery,
      filter,
      sort,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).render("error", { message: "Failed to fetch tasks." });
  }
};

// Add a new task
export const addTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, priority } = req.body;

  // Validation
  if (!title || title.trim().length < 3 || title.trim().length > 100) {
    return res.status(400).render("index", {
      tasks: await getAllTasks("", "all", ""),
      q: "",
      filter: "all",
      sort: "",
      errorMessage: "Title must be between 3 and 100 characters.",
    });
  }
  if (description && description.length > 500) {
    return res.status(400).render("index", {
      tasks: await getAllTasks("", "all", ""),
      q: "",
      filter: "all",
      sort: "",
      errorMessage: "Description cannot exceed 500 characters.",
    });
  }

  try {
    await addTask(title.trim(), description?.trim() || "", priority || "low");
    res.redirect("/");
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).render("error", { message: "Failed to add task." });
  }
};

// Toggle task completion
export const toggleTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId = parseInt(req.params.id);

  try {
    const task = await toggleTaskCompletion(taskId);
    if (!task) {
      return res.status(404).render("error", { message: "Task not found." });
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error toggling task:", error);
    res.status(500).render("error", { message: "Failed to toggle task." });
  }
};

// Delete a task
export const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId = parseInt(req.params.id);

  try {
    const task = await deleteTask(taskId);
    if (!task) {
      return res.status(404).render("error", { message: "Task not found." });
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).render("error", { message: "Failed to delete task." });
  }
};
