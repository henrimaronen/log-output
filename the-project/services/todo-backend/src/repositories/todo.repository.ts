import type { Todo } from "../types/todo.ts";

const todos: Todo[] = [];

export const create = (todo: Todo): Todo => {
  todos.push(todo);
  return todo;
};

export const fetchAll = (): Todo[] => {
  // Fetch todos from todo-app
  return todos;
};