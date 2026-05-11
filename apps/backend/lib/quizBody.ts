import * as z from "zod";

export const QuizBody = z.object({
  title: z.string().min(1),
});
