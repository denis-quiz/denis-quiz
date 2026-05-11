export async function quizCreate(title: string) {
  const res = await fetch("http://localhost:3000/api/quizzes", {
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
