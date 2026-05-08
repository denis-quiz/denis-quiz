import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { db } from "./db/db.js";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { healthRoutes } from "./health/health.routes.js";
import { quizzesRoutes } from "./quizzes/quizzes.routes.js";
import { authenticationRoutes } from "./auth/auth.routes.js";

const app = new Hono();

app.use(logger());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

healthRoutes(app, db);
quizzesRoutes(app, db);
authenticationRoutes(app);

serve(app);
