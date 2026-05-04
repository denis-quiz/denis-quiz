import type { NeonQueryFunction } from "@neondatabase/serverless";
import "dotenv/config";
import type { Context } from "hono";

export async function getDbHealth(
  c: Context,
  sql: NeonQueryFunction<false, false>,
) {
  try {
    const response = await sql`SELECT version()`;
    return c.json({ version: response[0]?.version });
  } catch (error) {
    console.error("Database query failed:", error);
    return c.text("Failed to connect to database", 500);
  }
}
