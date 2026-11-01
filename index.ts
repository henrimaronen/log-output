import { createServer, type Server } from "node:http";
import { app, printTimestamps } from "./app.ts";

const PORT: number = Number(process.env.PORT ?? 8888);

const server: Server = createServer(app);

server.listen(PORT, (): void => {
  console.log(`Server listening on port ${PORT}`);
  printTimestamps();
});
