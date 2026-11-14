import { app } from "./app.ts";

const PORT: number = Number(process.env.PORT ?? 9000);

app.listen(PORT, (error?: Error): void => {
  if (error) {
    console.error(`Failed to start server on port ${PORT}:`, error);
    throw error;
  }
  console.log(`Server started in port ${PORT}`);
});
