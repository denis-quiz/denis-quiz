import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db.js"; // your drizzle instance
import { account } from "../db/schema/account.js";
import { session } from "../db/schema/session.js";
import { user } from "../db/schema/user.js";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user,
      account,
      session,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
