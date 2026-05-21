import { Answer } from "@/lib/types/answer";

export type Question = {
  id: number;
  content: string;
  correctAnswerId: number | null;
  answers: Answer[];
};
