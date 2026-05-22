import { getApiUrl } from "@/lib/api";
import type { Question } from "@/lib/types/question";

function toDtoQuestions(questions: Question[]) {
  return questions.map((q) => {
    const filled = q.answers
      .map((a, originalIndex) => ({ content: a.content.trim(), originalIndex }))
      .filter((a) => a.content.length > 0);

    const selected = q.correctAnswerIndex ?? 0;
    const correctAnswerIndex = Math.max(
      0,
      filled.findIndex((a) => a.originalIndex === selected),
    );

    return {
      content: q.content.trim(),
      answers: filled.map((a) => ({ content: a.content })),
      correctAnswerIndex,
    };
  });
}

export function validateQuizPayload(
  title: string,
  questions: Question[],
): string | null {
  if (!title.trim()) return "Title is required";
  if (title.trim().length < 3) return "Title must be at least 3 characters long";
  if (questions.length === 0) return "Add at least one question";

  for (let i = 0; i < questions.length; i++) {
    const dto = toDtoQuestions([questions[i]])[0];
    if (!dto.content) return `Question ${i + 1} needs text`;
    if (dto.answers.length === 0) {
      return `Question ${i + 1} needs at least one answer`;
    }
    if (
      dto.correctAnswerIndex < 0 ||
      dto.correctAnswerIndex >= dto.answers.length
    ) {
      return `Question ${i + 1} needs a valid correct answer`;
    }
  }

  return null;
}

export async function quizCreate(payload: {
  title: string;
  questions: Question[];
}) {
  const dtoQuestions = toDtoQuestions(payload.questions);

  const res = await fetch(`${getApiUrl()}/api/quizzes`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: payload.title.trim(),
      questions: dtoQuestions,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Request failed (${res.status})`);
  }

  return res.json();
}
