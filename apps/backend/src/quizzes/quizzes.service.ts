import type { Context } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { quizzes } from "../db/schema/quizzes.js";
import { QuizBody } from "../../lib/quizBody.js";
import { eq } from "drizzle-orm";

export async function getQuizzes(c: Context, db: NeonHttpDatabase) {
  const result = await db.select().from(quizzes);
  return c.json(result);
}

export async function getQuizzesBySession(c: Context, db: NeonHttpDatabase) {
  try {
    const user = c.get("user");

    const result = await db
      .select({ id: quizzes.id, title: quizzes.title })
      .from(quizzes)
      .where(eq(quizzes.userId, user.id));

    return c.json(result);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
}

export async function postQuizzes(c: Context, db: NeonHttpDatabase) {
  try {
    const body = QuizBody.parse(await c.req.json());
    const user = c.get("user");

    if (!body?.title) {
      return c.json({ error: "Missing required fields: name" }, 400);
    }

    const result = await db
      .insert(quizzes)
      .values({
        title: body.title,
        userId: user.id,
      })
      .returning();

    return c.json(result, 201);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
}
