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
  <head><title>The Project</title></head>
  <body>
    <h1>The Project</h1>
    <img src="${src}" alt="Random picture" width="600" />
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
