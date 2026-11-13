import express, { type Express } from "express";

let pongCount: number = 0;

export const app: Express = express();

app.get("/pingpong", (_req, res): void => {
  res.type("text/plain").send(`pong ${pongCount}`);
  pongCount += 1;
});

app.get("/pings", (_req, res): void => {
  res.json({ pings: pongCount });
})
