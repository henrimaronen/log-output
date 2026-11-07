import express, { type Express } from "express";
import { hostname } from "node:os";

const PORT: number = Number(process.env.PORT ?? 9000);

const app: Express = express();

app.get("/", (_req, res): void => {
  res.json({
    pod: hostname(),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, (): void => {
  console.log(`Server started in port ${PORT}`);
});
