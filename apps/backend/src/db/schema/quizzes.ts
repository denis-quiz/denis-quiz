import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.js";

export const quizzes = pgTable("quizzes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
});
