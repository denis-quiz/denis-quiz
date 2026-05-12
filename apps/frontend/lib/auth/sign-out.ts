import { signOut } from "@/lib/auth/auth-client";

export async function signOutUser() {
  return await signOut();
}
