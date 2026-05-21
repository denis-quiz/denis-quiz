import "dotenv/config";
import { db } from "../src/db/db.js";
import { quizzes } from "../src/db/schema/quizzes.js";
import { questions } from "../src/db/schema/questions.js";
import { answers } from "../src/db/schema/answers.js";
import { user } from "../src/db/schema/user.js";
import { eq } from "drizzle-orm";

async function main() {
  const [testUser] = await db.select().from(user).limit(1);
  if (!testUser) {
    console.error("FAIL: no users in database — sign up first");
    process.exit(1);
  }

  const [quiz] = await db
    .insert(quizzes)
    .values({ title: "Script test quiz", userId: testUser.id })
    .returning();

  console.log("quiz inserted:", quiz.id);

  const [question] = await db
    .insert(questions)
    .values({ quizId: quiz.id, content: "Test question?" })
    .returning();

  console.log("question inserted:", question.id, "answer_id:", question.correctAnswerId);

  const insertedAnswers = await db
    .insert(answers)
    .values([
      { questionId: question.id, content: "Wrong" },
      { questionId: question.id, content: "Right" },
    ])
    .returning();

  const correct = insertedAnswers[1];
  await db
    .update(questions)
    .set({ correctAnswerId: correct.id })
    .where(eq(questions.id, question.id));

  const [updated] = await db
    .select()
    .from(questions)
    .where(eq(questions.id, question.id));

  console.log("SUCCESS:", {
    quizId: quiz.id,
    questionId: updated.id,
    correctAnswerId: updated.correctAnswerId,
  });

  process.exit(0);
}

main().catch((err) => {
  console.error("FAIL:", err instanceof Error ? err.message : err);
  process.exit(1);
});
