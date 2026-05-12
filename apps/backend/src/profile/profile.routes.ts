import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { Hono } from "hono";
import { getProfile, getSessionProfile } from "./profile.service.js";

export function profileRoutes(app: Hono, db: NeonHttpDatabase) {
  app.get("/api/profile", (c) => getSessionProfile(c, db));
  app.get("/api/profile/:id", (c) => getProfile(c, db));
}
