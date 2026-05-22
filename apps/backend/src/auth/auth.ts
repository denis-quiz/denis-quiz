import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db.js";
import { account } from "../db/schema/account.js";
import { session } from "../db/schema/session.js";
import { user } from "../db/schema/user.js";
export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3001"],
  database: drizzleAdapter(db, {
    provider: "pg",
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
