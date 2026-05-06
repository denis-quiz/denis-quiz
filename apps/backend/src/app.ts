import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { db } from "./db/db.js";
import { healthRoutes } from "./health/health.routes.js";
import { quizzesRoutes } from "./quizzes/quizzes.routes.js";
import { authenticationRoutes } from "./auth/auth.routes.js";

const app = new Hono();

healthRoutes(app, db);
quizzesRoutes(app, db);
authenticationRoutes(app);

serve(app);
