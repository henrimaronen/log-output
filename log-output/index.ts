import { app, printLogs } from "./app.ts";

const PORT: number = Number(process.env.PORT ?? 8888);

app.listen(PORT, (): void => {
  console.log(`Server listening on port ${PORT}`);
  printLogs();
});
