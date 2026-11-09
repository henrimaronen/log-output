import { access, readFile } from "node:fs/promises";
import express, { type Express } from "express";

const LOG_FILE: string = process.env.LOG_FILE ?? "/usr/src/app/files/log.txt";
const PING_PONG_FILE: string =
  process.env.PING_PONG_FILE ?? "/usr/src/app/files/pingpong.txt";
const PORT: number = Number(process.env.PORT ?? 8888);

const app: Express = express();

app.get("/", async (_req, res): Promise<void> => {
  try {
    const content: string = await readFile(LOG_FILE, "utf8");
    const lastLine: string = content.trim().split("\n").at(-1) ?? "";
    const count: string = await readFile(PING_PONG_FILE, "utf8").catch(
      (): string => "0",
    );
    res.type("text/plain").send(`${lastLine}.\nPing / Pongs: ${count}`);
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

app.listen(PORT, (): void => console.log(`Reader listening on port ${PORT}`));
