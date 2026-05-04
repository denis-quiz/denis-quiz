import { Hono } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { getQuizzes } from "./quizzes.service.js";
export function quizzesRoutes(app: Hono, db: NeonHttpDatabase) {
  app.get("/api/quizzes", (c) => getQuizzes(c, db));
}
