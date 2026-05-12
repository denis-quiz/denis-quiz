import type { Context } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { user } from "../db/schema/user.js";
import { eq } from "drizzle-orm";
import { auth } from "../auth/auth.js";
export async function getProfile(c: Context, db: NeonHttpDatabase) {
  const userId = c.req.param("id");

  return c.json((await getProfileFromDb(userId!, db)) ?? null);
}

export async function getSessionProfile(c: Context, db: NeonHttpDatabase) {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  const userId = session!.user.id;

  return c.json((await getProfileFromDb(userId, db)) ?? null);
}

async function getProfileFromDb(userId: string, db: NeonHttpDatabase) {
  const result = await db
    .select({
      name: user.name,
      bio: user.bio,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return result[0];
}
