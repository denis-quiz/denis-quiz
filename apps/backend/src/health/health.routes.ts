import { Hono } from "hono";
import { getDbHealth } from "./health.service.js";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
export function healthRoutes(app: Hono, db: NeonHttpDatabase) {
  app.get("/api/health", (c) => c.json({ status: "OK" }));

  app.get("/api/dbHealth", (c) => getDbHealth(c, db));
}
