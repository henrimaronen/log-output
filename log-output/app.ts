import { randomUUID, randomBytes } from "node:crypto";
import { hostname } from "node:os";
import express, { type Express } from "express";

const LOG_OUTPUT_INTERVAL = 5000;

const instanceId: string = randomUUID();

export const app: Express = express();

app.get("/", (_req, res): void => {
  res.json({
    pod: hostname(),
    instanceId,
    uptimeSeconds: Math.floor(process.uptime()),
    logCount: logs.length,
    latestLog: logs.at(-1) ?? null,
    timestamp: new Date().toISOString(),
    randomString,
  });
});

app.use((_req, res): void => {
  res.json({ instanceId });
});

const randomString: string = randomBytes(12).toString("hex");

export const logs: string[] = [];

export const printLogs = (
  intervalMs: number = LOG_OUTPUT_INTERVAL,
): NodeJS.Timeout =>
  setInterval((): void => {
    const line: string = `${new Date().toISOString()}: ${randomString}`;
    console.log(line);
    logs.push(line);
  }, intervalMs);
