export async function quizCreate(title: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/quizze`, {
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
