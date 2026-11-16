import { mkdir, readFile, stat, utimes, writeFile } from "node:fs/promises";
import path from "node:path";

const IMAGE_DIR: string = process.env.IMAGE_DIR ?? "./files";
const IMAGE_PATH: string = path.join(IMAGE_DIR, process.env.IMAGE_NAME ?? "image.jpg");

const IMAGE_URL: string = process.env.IMAGE_URL ?? "https://picsum.photos/1200";
const TTL_MS: number = Number(process.env.IMAGE_TTL_MS ?? 10 * 60 * 1000);
const FETCH_TIMEOUT_MS: number = Number(process.env.IMAGE_FETCH_TIMEOUT_MS ?? 5_000);

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

  let data: Buffer;
  try {
    const response: Response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch image from ${url}: ${response.status} ${response.statusText}`,
      );
      throw new Error(`Image fetch failed with status ${response.status}`);
    }

    data = Buffer.from(await response.arrayBuffer());
  } catch (error) {
    if (cachedAt === undefined) throw error;
    console.error(`Serving stale image, fetch from ${url} failed:`, error);
    const now: Date = new Date();
    await utimes(IMAGE_PATH, now, now);
    return readFile(IMAGE_PATH);
  }

  await mkdir(IMAGE_DIR, { recursive: true });
  await writeFile(IMAGE_PATH, data);
  return data;
};
