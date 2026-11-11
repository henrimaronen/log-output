import express, { type Express } from "express";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { hostname } from "node:os";
import path from "node:path";

const PORT: number = Number(process.env.PORT ?? 9000);

const app: Express = express();

const IMAGE_DIR: string = process.env.IMAGE_DIR ?? "./files";
const IMAGE_PATH: string = path.join(IMAGE_DIR, "image.jpg");

const IMAGE_URL: string = "https://picsum.photos/1200";
const TTL_MS: number = 10 * 60 * 1000;

const todos: string[] = ["Learn TypeScript", "Learn React", "Learn k8"];

const getCachedAt = async (): Promise<number | undefined> => {
  try {
    return (await stat(IMAGE_PATH)).mtimeMs;
  } catch {
    return undefined;
  }
};

const fetchImage = async (url: string = IMAGE_URL): Promise<Buffer> => {
  const cachedAt: number | undefined = await getCachedAt();
  if (cachedAt !== undefined && Date.now() - cachedAt < TTL_MS) {
    return readFile(IMAGE_PATH);
  }

  const response: Response = await fetch(url);
  if (!response.ok) {
    console.error(
      `Failed to fetch image from ${url}: ${response.status} ${response.statusText}`,
    );
    throw new Error(`Image fetch failed with status ${response.status}`);
  }

  const data: Buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(IMAGE_DIR, { recursive: true });
  await writeFile(IMAGE_PATH, data);
  return data;
};

app.get("/", (_req, res): void => {
  res.json({
    pod: hostname(),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.get("/picture", async (_req, res): Promise<void> => {
  try {
    const image: Buffer = await fetchImage();
    const src: string = `data:image/jpeg;base64,${image.toString("base64")}`;
    res.send(`<!DOCTYPE html>
<html>
  <head>
    <title>The Project</title>
    <style>
      input {
        flex: 1;
        padding: 8px 12px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        padding: 8px 16px;
        font-size: 14px;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      li {
        padding: 10px 12px;
        margin-bottom: 8px;
        background-color: #f5f5f5;
        border-left: 4px solid #007bff;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
  <div style="width: 600px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
    <h1>The Project</h1>
      <img src="${src}" alt="Random picture" width="600" style="max-width: 600px; max-height: 600px;" />
      <input placeholder="Enter a new todo (max 140 characters)" type="text" />
      <button>Send</button>
    </div>
  <div style="width: 600px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <h3>Todos</h3>
      <ul style="width: 100%;">
        ${todos.map((todo: string): string => `<li>${todo}</li>`).join("")}
      </ul>
    </div>
  </body>
</html>`);
  } catch (error) {
    console.error("Failed to serve /picture:", error);
    res.status(502).send("Could not fetch image");
  }
});

app.listen(PORT, (): void => {
  console.log(`Server started in port ${PORT}`);
});
