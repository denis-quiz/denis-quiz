export function getApiUrl() {
  const url = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}
