import { Hono } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { getQuizzes } from "./quizzes.service.js";
import { requireAuth } from "../middleware/requireAuth.js";
export function quizzesRoutes(app: Hono, db: NeonHttpDatabase) {
  app.get("/api/quizzes", requireAuth, (c) => getQuizzes(c, db));
}
