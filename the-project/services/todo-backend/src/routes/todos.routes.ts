import { Router } from "express";
import * as todoRepository from "../repositories/todo.repository.ts";
import type { Todo } from "../types/todo.ts";

export const todosRouter: Router = Router();

todosRouter.post("/", (req, res): void => {
  const todo: Todo = todoRepository.create(req.body);
  res.status(201).json(todo);
});

todosRouter.get("/", (_req, res): void => {
  const todos: Todo[] = todoRepository.fetchAll();
  res.json(todos);
});