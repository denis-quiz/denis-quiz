import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { healthRoutes } from "./health/health.routes.js";

const app = new Hono();
const sql = neon(process.env.DATABASE_URL!);

healthRoutes(app, sql);

serve(app);
