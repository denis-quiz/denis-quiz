import { getApiUrl } from "@/lib/api";

export async function getSessionProfile() {
  const res = await fetch(`${getApiUrl()}/api/profile`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    throw new Error("Failed to load profile");
  }

  return res.json();
}
