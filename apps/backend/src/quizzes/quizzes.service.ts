import type { Context } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { quizzes } from "../db/schema/quizzes.js";
import { QuizBody } from "../../lib/quizBody.js";
import { QuestionBody } from "../../lib/questionBody.js";
import { and, eq } from "drizzle-orm";
import { questions } from "../db/schema/questions.js";
import { answers } from "../db/schema/answers.js";

export async function getQuizzes(c: Context, db: NeonHttpDatabase) {
  const result = await db.select().from(quizzes);
  return c.json(result);
}

export async function postQuizzes(c: Context, db: NeonHttpDatabase) {
  try {
    const body = QuizBody.parse(await c.req.json());
    const user = c.get("user");

    if (!body?.title) {
      return c.json({ error: "Missing required fields: name" }, 400);
    }

    const result = await db
      .insert(quizzes)
      .values({
        title: body.title,
        userId: user.id,
      })
      .returning();

    return c.json(result, 201);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
}

export async function postQuestion(c: Context, db: NeonHttpDatabase) {
  try {
    const body = QuestionBody.parse(await c.req.json());
    const user = c.get("user");

    const quiz = await db
      .select()
      .from(quizzes)
      .where(and(eq(quizzes.id, body.quizId), eq(quizzes.userId, user.id)))
      .limit(1);

    if (!quiz[0]) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    const result = await db.transaction(async (tx) => {
      const [question] = await tx
        .insert(questions)
        .values({
          quizId: body.quizId,
          content: body.question,
        })
        .returning();

      const insertedAnswers = await tx
        .insert(answers)
        .values(
          body.answers.map((a) => ({
            questionId: question.id,
            content: a,
          })),
        )
        .returning();

      const correct = insertedAnswers[body.correctAnswerId];

      if (!correct) {
        throw new Error("Invalid correctAnswerIndex");
      }

      return {
        question,
        answers: insertedAnswers,
        correctAnswerId: correct.id,
      };
    });

    return c.json(result, 201);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
}
