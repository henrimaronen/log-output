import { randomUUID, randomBytes } from "node:crypto";
import type { RequestListener } from "node:http";

const LOG_OUTPUT_INTERVAL = 5000;

const instanceId: string = randomUUID();

export const app: RequestListener = (_req, res): void => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ instanceId }));
};

const randomString: string = randomBytes(12).toString("ascii");

export const logs: string[] = [];

export const printTimestamps = (
  intervalMs: number = LOG_OUTPUT_INTERVAL,
): NodeJS.Timeout =>
  setInterval((): void => {
    const line: string = `${new Date().toISOString()}: ${randomString}`;
    console.log(line);
    logs.push(line);
  }, intervalMs);
