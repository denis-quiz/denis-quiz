import { Hono } from "hono";
import { auth } from "./auth.js";

export function authenticationRoutes(app: Hono) {
  app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
}
