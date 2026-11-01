import { createServer, type Server } from "node:http";

const PORT: number = Number(process.env.PORT ?? 8889);

const server: Server = createServer((_req, res): void => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK");
});

server.listen(PORT, (): void => {
  console.log(`Server started in port ${PORT}`);
});
