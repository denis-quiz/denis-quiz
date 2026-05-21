import {  integer, pgTable, text } from "drizzle-orm/pg-core";
import { questions } from "./questions.js";

export const answers = pgTable("answers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id, {
      onDelete: "cascade",
    }),

  content: text("content").notNull(),
});
