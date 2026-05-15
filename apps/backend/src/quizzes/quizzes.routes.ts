import { Hono } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import {
  getQuizzes,
  getQuizzesBySession,
  postQuizzes,
} from "./quizzes.service.js";
import { requireAuth } from "../middleware/requireAuth.js";
export function quizzesRoutes(app: Hono, db: NeonHttpDatabase) {
  app.get("/api/quizzes", requireAuth, (c) => getQuizzes(c, db));

  app.get("/api/quizzes/session", requireAuth, (c) =>
    getQuizzesBySession(c, db),
  );

  app.post("/api/quizzes", requireAuth, async (c) => postQuizzes(c, db));
}
