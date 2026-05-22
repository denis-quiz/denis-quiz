import * as z from "zod";
import { QuestionBody } from "./questionBody.js";

export const QuizBody = z.object({
  title: z.string().min(1),
  questions: z.array(QuestionBody).min(1),
});