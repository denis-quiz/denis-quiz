import { getApiUrl } from "@/lib/api";
export async function quizzesGetBySession() {
  const res = await fetch(`${getApiUrl()}/api/quizzes/session`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
