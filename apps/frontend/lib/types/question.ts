import { Answer } from "@/lib/types/answer";

export type Question = {
  tempId: string;
  content: string;
  answers: Answer[];
  correctAnswerIndex: number | null;
};
