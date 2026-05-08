import type { Context } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { quizzes } from "../db/schema/quizzes.js";

export async function getQuizzes(c: Context, db: NeonHttpDatabase) {
  const result = await db.select().from(quizzes);
  return c.json(result);
}

export async function postQuizzes(c: Context, db: NeonHttpDatabase) {
  try {
    const body = await c.req.json();

    if (!body?.name || !body?.userId) {
      return c.json({ error: "Missing required fields: name, userId" }, 400);
    }

    const result = await db
      .insert(quizzes)
      .values({
        name: body.name,
        userId: body.userId,
      })
      .returning();

    return c.json(result, 201);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
}
