import * as z from "zod";

export const AnswerBody = z.object({
  content: z.string().min(1),
});
