import { app } from "./app.ts";

const PORT: number = Number(process.env.PORT ?? 9000);

app.listen(PORT, (): void => {
  console.log(`Server started in port ${PORT}`);
});
