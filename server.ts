import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import adminRouter from "./src/apps/admin/routes";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3006;

  app.use(cors());
  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", portal: "Accountability_Platform_Jharkhand", port: PORT, timestamp: new Date() });
  });

  // Mount modular Monolith API
  app.use("/api/v1/admin", adminRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Accountability_Platform_Jharkhand] Server running on http://localhost:${PORT}`);
  });
}

startServer();
