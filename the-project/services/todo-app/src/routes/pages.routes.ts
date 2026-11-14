import { Router } from "express";
import { hostname } from "node:os";
import { fetchImage } from "../lib/image-cache.ts";
import { renderPage } from "../views/page.ts";

const todos: string[] = ["Learn TypeScript", "Learn React", "Learn k8"];

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
    const image: Buffer = await fetchImage();
    const src: string = `data:image/jpeg;base64,${image.toString("base64")}`;
    res.send(renderPage(src, todos));
  } catch (error) {
    console.error("Failed to serve /picture:", error);
    res.status(502).send("Could not fetch image");
  }
});
