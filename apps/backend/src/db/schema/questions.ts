import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { quizzes } from "./quizzes.js";

export const questions = pgTable("questions", {
  id: integer("id").primaryKey(),

  quizId: integer("quiz_id")
    .notNull()
    .references(() => quizzes.id, {
      onDelete: "cascade",
    }),

  content: text("content").notNull(),
});
