import type { Context } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";

export async function getDbHealth(c: Context, db: NeonHttpDatabase) {
  try {
    const result = await db.execute(sql`SELECT version()`);

    return c.json({
      version: result.rows[0]?.version,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return c.text("Failed to connect to database", 500);
  }
}
