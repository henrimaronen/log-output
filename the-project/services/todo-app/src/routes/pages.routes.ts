import { Router } from "express";
import { hostname } from "node:os";
import { getTodos } from "../clients/todo-backend.client.ts";
import { fetchImage } from "../lib/image-cache.ts";
import type { Todo } from "../types/todo.ts";
import { renderPage } from "../views/page.ts";

export const pagesRouter: Router = Router();

pagesRouter.get("/health", (_req, res): void => {
  res.json({
    pod: hostname(),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

pagesRouter.get("/", async (_req, res): Promise<void> => {
  try {
    const todos: Todo[] = await getTodos();
    res.send(renderPage(todos));
  } catch (error) {
    console.error("Failed to serve /:", error);
    res.status(502).send("Could not load page");
  }
});

pagesRouter.get("/image", async (_req, res): Promise<void> => {
  try {
    res.type("image/jpeg").send(await fetchImage());
  } catch (error) {
    console.error("Failed to serve /image:", error);
    res.sendStatus(502);
  }
});

pagesRouter.get("/todos", async (_req, res): Promise<void> => {
  try {
    const todos: Todo[] = await getTodos();
    res.json(todos);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    res.status(502).send("Could not fetch todos");
  }
});
