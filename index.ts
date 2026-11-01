import { randomUUID } from "node:crypto";
import { createServer, type Server } from "node:http";

const PORT: number = Number(process.env.PORT ?? 8888);
const instanceId: string = randomUUID();

const server: Server = createServer((_req, res): void => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ instanceId }));
});

server.listen(PORT, (): void => {
  console.log(`Server listening on port ${PORT}`);
});
