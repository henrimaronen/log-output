import type { Todo } from "../types/todo.ts";

const TODO_BACKEND_URL: string =
  process.env.TODO_BACKEND_URL ?? "http://localhost:3000";

export const getTodos = async (): Promise<Todo[]> => {
  const url: string = `${TODO_BACKEND_URL}/todos`;
  const response: Response = await fetch(url);
  if (!response.ok) {
    console.error(
      `Failed to fetch todos from ${url}: ${response.status} ${response.statusText}`,
    );
    throw new Error(`Todo fetch failed with status ${response.status}`);
  }
  return (await response.json()) as Todo[];
};
