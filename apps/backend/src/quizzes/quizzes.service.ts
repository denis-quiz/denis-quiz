import type { Context } from "hono";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { quizzes } from "../db/schema/quizzes.js";
import { questions } from "../db/schema/questions.js";
import { answers } from "../db/schema/answers.js";
import { QuizBody } from "../../lib/quizBody.js";
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

export async function getQuizzes(c: Context, db: NeonHttpDatabase) {
  const result = await db.select().from(quizzes);
  return c.json(result);
}

export async function postQuizzes(c: Context, db: NeonHttpDatabase) {
  try {
    const raw = await c.req.json();
    const body = QuizBody.parse(raw);

    const user = c.get("user");

    const [quiz] = await db
      .insert(quizzes)
      .values({
        title: body.title,
        userId: user.id,
      })
      .returning();

    const createdQuestions = [];

    for (const q of body.questions) {
      const [question] = await db
        .insert(questions)
        .values({
          quizId: quiz.id,
          content: q.content,
        })
        .returning();

      const insertedAnswers = await db
        .insert(answers)
        .values(
          q.answers.map((a) => ({
            questionId: question.id,
            content: a.content,
          })),
        )
        .returning();

      const correctAnswer = insertedAnswers[q.correctAnswerIndex];

      if (!correctAnswer) {
        throw new Error(`Invalid correctAnswerIndex: ${q.correctAnswerIndex}`);
      }

      const [updatedQuestion] = await db
        .update(questions)
        .set({
          correctAnswerId: correctAnswer.id,
        })
        .where(eq(questions.id, question.id))
        .returning();

      createdQuestions.push({
        ...updatedQuestion,
        answers: insertedAnswers,
      });
    }

    return c.json({ quiz, questions: createdQuestions }, 201);
  } catch (err) {
    if (err instanceof ZodError) {
      return c.json(
        {
          error: "Validation error",
          issues: err.flatten(),
        },
        400,
      );
    }

    if (err instanceof Error) {
      return c.json(
        {
          error: err.message,
        },
        400,
      );
    }

    return c.json({ error: "Internal server error" }, 500);
  }
}
