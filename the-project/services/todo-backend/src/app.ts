import express, { type Express } from "express";
import { todosRouter } from "./routes/todos.routes.ts";

export const app: Express = express();

app.use(express.json());
app.use(todosRouter);