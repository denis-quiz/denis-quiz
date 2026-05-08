import { Hono } from "hono";
import { auth } from "./auth.js"; // path to your auth file
// import { cors } from "hono/cors";

export function authenticationRoutes(app: Hono) {
  app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
}
