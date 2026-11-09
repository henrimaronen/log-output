import express, { type Express } from "express";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

let pongCount: number = 0;

export const app: Express = express();

const COUNT_FILE: string =
  process.env.COUNT_FILE ?? "/usr/src/app/files/pingpong.txt";

mkdirSync(dirname(COUNT_FILE), { recursive: true });

app.get("/pingpong", (_req, res): void => {
  res.type("text/plain").send(`pong ${pongCount}`);
  pongCount += 1;
  writeFileSync(COUNT_FILE, String(pongCount));
});

function readCount(): number {
  try {
    return Number(readFileSync(COUNT_FILE, "utf8")) || 0;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return 0;
    console.error(`Failed to read ${COUNT_FILE}:`, err);
    throw err;
  }
}

pongCount = readCount();
