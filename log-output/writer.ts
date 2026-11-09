import { appendFileSync, existsSync, mkdirSync, statSync, truncateSync } from "node:fs";
import { dirname } from "node:path";
import { getStatus } from "./app.ts";

const LOG_FILE: string = process.env.LOG_FILE ?? "/usr/src/app/files/log.txt";
const INTERVAL_MS: number = 5000;
const MAX_LOG_BYTES: number = 1024 * 1024;

mkdirSync(dirname(LOG_FILE), { recursive: true });

setInterval((): void => {
  if (existsSync(LOG_FILE) && statSync(LOG_FILE).size > MAX_LOG_BYTES) {
    truncateSync(LOG_FILE);
  }
  const { timestamp, randomString } = getStatus();
  const line: string = `${timestamp}: ${randomString}`;
  console.log(line);
  appendFileSync(LOG_FILE, `${line}\n`);
}, INTERVAL_MS);
