import { Request, Response } from "express";
import {
  getTaskById,
  getAllTasks,
  addTask,
  toggleTaskCompletion,
  deleteTask,
  updateTask,
} from "../models/taskModel.js";

// Fetch all tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const searchQuery = (req.query.q as string) || "";
  const filter = (req.query.filter as string) || "all";
  let sort = (req.query.sort as string) || "";
  const action = req.query.action as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = 5; // Number of tasks per page
  const offset = (page - 1) * limit;

  // Reset sort if action is "clear"
  if (action === "clear") {
    sort = "";
  }

  // Validate sort parameter
  try {
    const { tasks, total } = await getAllTasks(
      searchQuery.toLowerCase(),
      filter,
      sort,
      limit,
      offset
    );
    const totalPages = Math.ceil(total / limit);

    res.render("index", {
      tasks,
      q: searchQuery,
      filter,
      sort,
      page,
      totalPages,
      priority: "low",
      errors: {}, // Pass an empty errors object
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

  const errors: { title?: string; description?: string } = {};

  // Validation for title
  if (!title || title.trim().length < 3 || title.trim().length > 100) {
    errors.title = "Title must be between 3 and 100 characters.";
  }

  // Validation for description
  if (description && description.length > 500) {
    errors.description = "Description cannot exceed 500 characters.";
  }

  if (Object.keys(errors).length > 0) {
    const { tasks, total } = await getAllTasks("", "all", "", 5, 0); // Fetch tasks
    return res.status(400).render("index", {
      tasks,
      q: "",
      filter: "all",
      sort: "",
      page: 1,
      totalPages: Math.ceil(total / 5),
      errors,
      title, // Retain the submitted title
      description, // Retain the submitted description
      priority, // Retain the selected priority
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

// Render the update form for a specific task
export const renderUpdateFormController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId = parseInt(req.params.id);

  try {
    const task = await getTaskById(taskId);
    if (!task) {
      return res.status(404).render("error", { message: "Task not found." });
    }

    res.render("update", { task });
  } catch (error) {
    console.error("Error fetching task for update:", error);
    res
      .status(500)
      .render("error", { message: "Failed to load task for editing." });
  }
};

// Update a task
export const updateTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId = parseInt(req.params.id);
  const { title, description, priority } = req.body;

  try {
    const updatedTask = await updateTask(taskId, {
      ...(title && { title: title.trim() }),
      ...(description && { description: description.trim() }),
      ...(priority && { priority }),
    });

    if (!updatedTask) {
      return res.status(404).render("error", { message: "Task not found." });
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).render("error", { message: "Failed to update task." });
  }
};
