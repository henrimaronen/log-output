import { access, readFile } from "node:fs/promises";
import express, { type Express } from "express";

const LOG_FILE: string = process.env.LOG_FILE ?? "/usr/src/app/files/log.txt";
const PING_PONG_FILE: string =
  process.env.PING_PONG_FILE ?? "/usr/src/app/files/pingpong.txt";
const PORT: number = Number(process.env.PORT ?? 8888);
const PING_PONG_URL: string = process.env.PING_PONG_URL ?? "http://ping-pong-svc:2345";

const app: Express = express();

app.get("/", async (_req, res): Promise<void> => {
  try {
    const content: string = await readFile(LOG_FILE, "utf8");
    const lastLine: string = content.trim().split("\n").at(-1) ?? "";
    const pings: number = await fetchPings();
    res.type("text/plain").send(`${lastLine}.\nPing / Pongs: ${pings}`);
  } catch (err: unknown) {
    console.error(`Failed to read ${LOG_FILE}:`, err);
    res.status(500).send("Log file not available yet");
  }
});

app.get("/healthz", async (_req, res): Promise<void> => {
  try {
    await access(LOG_FILE);
    res.sendStatus(200);
  } catch {
    res.sendStatus(503);
  }
});

async function fetchPings(): Promise<number> {
  const url: string = `${PING_PONG_URL}/pings`;
  const response: Response = await fetch(url, {
    signal: AbortSignal.timeout(1000),
  });

  if (!response.ok) {
    console.error(response.statusText);
    const message: string = `ping pong service is not available at ${url}`;
    throw new Error(message);
  }

  const body: unknown = await response.json();
  console.log(body);
  if (typeof body !== "object" || body === null || !("pings" in body)) {
    const message: string = `ping pong service returned invalid response at ${url}`;
    console.error(message);
    throw new Error(message);
  }
  return (body as { pings: number }).pings;
}

app.listen(PORT, (): void => console.log(`Reader listening on port ${PORT}`));
