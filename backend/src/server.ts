import type { Request, Response } from "express";
import { createServer } from "http";

import app, { startServer } from "./app.js";
import { initializeSocket } from "./socket/index.js";

const httpServer = createServer(app);

initializeSocket(httpServer);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is working...");
});

const PORT = 3000;

httpServer.listen(PORT, async () => {
  await startServer();

  console.log(`🚀 Server running on port ${PORT}`);
});