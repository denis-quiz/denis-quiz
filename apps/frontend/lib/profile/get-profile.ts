import { getApiUrl } from "@/lib/api";

export async function getProfile(id: string) {
  const res = await fetch(`${getApiUrl()}/api/profile/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
