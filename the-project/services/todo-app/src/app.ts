import express, { type Express } from "express";
import { pagesRouter } from "./routes/pages.routes.ts";

export const app: Express = express();

app.use(pagesRouter);
