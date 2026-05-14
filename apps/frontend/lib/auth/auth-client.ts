import { createAuthClient } from "better-auth/react";
import { getApiUrl } from "@/lib/api";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: getApiUrl(),
});
