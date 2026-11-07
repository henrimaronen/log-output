import { randomUUID, randomBytes } from "node:crypto";
import { hostname } from "node:os";
import express, { type Express } from "express";

const LOG_OUTPUT_INTERVAL = 5000;

const instanceId: string = randomUUID();

const randomString: string = randomBytes(12).toString("hex");

export const logs: string[] = [];

export type Status = {
  timestamp: string;
  randomString: string;
};

export const getStatus = (): Status => ({
  timestamp: new Date().toISOString(),
  randomString,
});

export const app: Express = express();

app.get("/", (_req, res): void => {
  res.json({
    pod: hostname(),
    instanceId,
    uptimeSeconds: Math.floor(process.uptime()),
    logCount: logs.length,
    latestLog: logs.at(-1) ?? null,
    ...getStatus(),
  });
});

app.get("/status", (_req, res): void => {
  res.json(getStatus());
});

app.use((_req, res): void => {
  res.json({ instanceId });
});

export const printLogs = (
  intervalMs: number = LOG_OUTPUT_INTERVAL,
): NodeJS.Timeout =>
  setInterval((): void => {
    const { timestamp, randomString } = getStatus();
    const line: string = `${timestamp}: ${randomString}`;
    console.log(line);
    logs.push(line);
  }, intervalMs);
