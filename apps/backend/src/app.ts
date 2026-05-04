import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { db } from "./db/db.js";
import { healthRoutes } from "./health/health.routes.js";
import { quizzesRoutes } from "./quizzes/quizzes.routes.js";

const app = new Hono();

healthRoutes(app, db);
quizzesRoutes(app, db);

serve(app);
