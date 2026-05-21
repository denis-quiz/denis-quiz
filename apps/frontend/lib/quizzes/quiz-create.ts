import { getApiUrl } from "@/lib/api";
import {Question} from "@/lib/types/question";

export async function quizCreate(title: { title: string; questions: Question[] }) {
  const res = await fetch(`${getApiUrl()}/api/quizzes`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
