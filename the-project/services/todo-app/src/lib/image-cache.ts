import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

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

export const fetchImage = async (url: string = IMAGE_URL): Promise<Buffer> => {
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
