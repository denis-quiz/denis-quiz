import type { Context } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { quizzesTable } from "../db/schema.js";

export async function getQuizzes(c: Context, db: NeonHttpDatabase) {
  const result = await db.select().from(quizzesTable);
  return c.json(result);
}
