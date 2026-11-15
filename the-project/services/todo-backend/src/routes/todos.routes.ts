import { Router } from "express";
import * as todoRepository from "../repositories/todo.repository.ts";
import type { Todo } from "../types/todo.ts";

const TODO_APP_URL: string = process.env.TODO_APP_URL ?? "http://localhost:9000";

export const todosRouter: Router = Router();

todosRouter.post("/todos", (req, res): void => {
  todoRepository.create(req.body);
  res.redirect(TODO_APP_URL);
});

todosRouter.get("/todos", (_req, res): void => {
  const todos: Todo[] = todoRepository.fetchAll();
  res.json(todos);
});