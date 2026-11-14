import { app } from "./app.ts";

const PORT: number = Number(process.env.PORT ?? 3000);

app.listen(PORT, (): void => {
  console.log(`Server listening on port ${PORT}`);
});
