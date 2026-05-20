import * as z from "zod";

export const QuestionBody = z.object({
  quizId: z.number().int(),
  question: z.string().min(1),
  answers: z.array(z.string().min(1)),
  correctAnswerIndex: z.number().int().min(1),
});
