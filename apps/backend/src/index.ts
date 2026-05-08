import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

const app = new Hono();

const db = drizzle(process.env.DATABASE_URL!);
app.get("/", async (c) => {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const response = await sql`SELECT version()`;
    return c.json({ version: response[0]?.version });
  } catch (error) {
    console.error("Database query failed:", error);
    return c.text("Failed to connect to database", 500);
  }
});

serve(app);
