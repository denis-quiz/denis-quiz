export async function getProfile(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/api/profile/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
