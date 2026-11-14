import { Router } from "express";
import { hostname } from "node:os";
import { getTodos } from "../clients/todo-backend.client.ts";
import { fetchImage } from "../lib/image-cache.ts";
import type { Todo } from "../types/todo.ts";
import { renderPage } from "../views/page.ts";

export const pagesRouter: Router = Router();

pagesRouter.get("/", (_req, res): void => {
  res.json({
    pod: hostname(),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

pagesRouter.get("/picture", async (_req, res): Promise<void> => {
  try {
    const [image, todos]: [Buffer, Todo[]] = await Promise.all([
      fetchImage(),
      getTodos(),
    ]);
    const src: string = `data:image/jpeg;base64,${image.toString("base64")}`;
    res.send(renderPage(src, todos));
  } catch (error) {
    console.error("Failed to serve /picture:", error);
    res.status(502).send("Could not load page");
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
