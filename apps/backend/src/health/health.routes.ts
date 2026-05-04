import { Hono } from "hono";
import { getDbHealth } from "./health.service.js";
import type { NeonQueryFunction } from "@neondatabase/serverless";
export function healthRoutes(app: Hono, sql: NeonQueryFunction<false, false>) {
  app.get("/api/health", (c) => c.json({ status: "OK" }));

  app.get("/api/dbHealth", (c) => getDbHealth(c, sql));
}
