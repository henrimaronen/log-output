import express, { type Express } from "express";

const PORT: number = Number(process.env.PORT ?? 9000);

const app: Express = express();

app.get("/", (_req, res): void => {
  res.json("OK");
});

app.listen(PORT, (): void => {
  console.log(`Server started in port ${PORT}`);
});
