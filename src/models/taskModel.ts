export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

let nextId = 1;
export const getNextId = () => nextId++;
export let tasks: Task[] = [];
