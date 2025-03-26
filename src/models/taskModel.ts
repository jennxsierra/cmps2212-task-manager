import { query } from "../config/dbConfig";

// Define the Task interface
export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  created_at: Date;
}

// Fetch all tasks with optional search, filter, and sort
export const getAllTasks = async (
  searchQuery: string,
  filter: string,
  sort: string
): Promise<Task[]> => {
  let baseQuery = `SELECT * FROM tasks WHERE 1=1`;
  const values: any[] = [];

  // Search filter
  if (searchQuery) {
    baseQuery += ` AND (LOWER(title) ILIKE $1 OR LOWER(description) ILIKE $1)`;
    values.push(`%${searchQuery}%`);
  }

  // Completed filter
  if (filter === "completed") {
    baseQuery += ` AND completed = TRUE`;
  } else if (filter === "incomplete") {
    baseQuery += ` AND completed = FALSE`;
  }

  // Sort logic
  if (sort === "lowToHigh") {
    baseQuery += ` ORDER BY CASE priority WHEN 'low' THEN 1 WHEN 'medium' THEN 2 WHEN 'high' THEN 3 END ASC, id ASC`;
  } else if (sort === "highToLow") {
    baseQuery += ` ORDER BY CASE priority WHEN 'high' THEN 3 WHEN 'medium' THEN 2 WHEN 'low' THEN 1 END DESC, id ASC`;
  } else {
    baseQuery += ` ORDER BY id ASC`;
  }

  const result = await query(baseQuery, values);
  return result.rows;
};

// Add a new task
export const addTask = async (
  title: string,
  description: string,
  priority: string
): Promise<Task> => {
  const result = await query(
    `INSERT INTO tasks (title, description, priority) VALUES ($1, $2, $3) RETURNING *`,
    [title, description, priority]
  );
  return result.rows[0];
};

// Toggle task completion
export const toggleTaskCompletion = async (
  id: number
): Promise<Task | null> => {
  const result = await query(
    `UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0] || null;
};

// Delete a task
export const deleteTask = async (id: number): Promise<Task | null> => {
  const result = await query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [
    id,
  ]);
  return result.rows[0] || null;
};
