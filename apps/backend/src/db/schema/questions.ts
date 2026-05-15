import { type AnyPgColumn, integer, pgTable, text } from "drizzle-orm/pg-core";
import { answers } from "./answers.js";
import { quizzes } from "./quizzes.js";

export const questions = pgTable("questions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  quizId: integer("quiz_id")
    .notNull()
    .references(() => quizzes.id, { onDelete: "cascade" }),

  answerId: integer("answer_id").references((): AnyPgColumn => answers.id),

  content: text("content").notNull(),
});
