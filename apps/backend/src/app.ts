import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { db } from "./db/db.js";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { healthRoutes } from "./health/health.routes.js";
import { quizzesRoutes } from "./quizzes/quizzes.routes.js";
import { authenticationRoutes } from "./auth/auth.routes.js";
import {sql} from "drizzle-orm";

const app = new Hono();

app.use(logger());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.get("/debug-db", async (c) => {
    const dbName = await db.execute(sql`select current_database();`);

    const tables = await db.execute(sql`
    select tablename
    from pg_tables
    where schemaname = 'public';
  `);

    return c.json({ dbName, tables });
});

healthRoutes(app, db);
quizzesRoutes(app, db);
authenticationRoutes(app);

serve(app);
