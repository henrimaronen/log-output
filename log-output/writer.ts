import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { getStatus } from "./app.ts";

const LOG_FILE: string = process.env.LOG_FILE ?? "/usr/src/app/files/log.txt";
const INTERVAL_MS: number = 5000;

mkdirSync(dirname(LOG_FILE), { recursive: true });

setInterval((): void => {
  const { timestamp, randomString } = getStatus();
  const line: string = `${timestamp}: ${randomString}`;
  console.log(line);
  appendFileSync(LOG_FILE, `${line}\n`);
}, INTERVAL_MS);
