import * as z from "zod";
import { AnswerBody } from "./answerBody.js";

export const QuestionBody = z.object({
  content: z.string().min(1),
  answers: z.array(AnswerBody).min(1),
  correctAnswerIndex: z.number().int(),
});
