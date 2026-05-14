import { signIn } from "@/lib/auth/auth-client";
import type { SignInResult } from "@/lib/types/authentication";

function getSignInErrorMessage(error: {
  message?: string;
  status?: number;
}): string {
  const message = error.message?.toLowerCase() ?? "";

  if (message.includes("not found") || message.includes("no user")) {
    return "No account found for this email.";
  }

  if (
    message.includes("invalid") ||
    message.includes("credential") ||
    message.includes("password")
  ) {
    return "Invalid email or password.";
  }

  if (error.status === 403) {
    return "Sign in was blocked by the server. Check auth configuration.";
  }

  return error.message ?? "Unable to sign in. Please try again.";
}

export async function signInUser(
  email: string,
  password: string,
): Promise<SignInResult> {
  try {
    const { data, error } = await signIn.email({
      email,
      password,
      callbackURL: "/userprofile",
      rememberMe: false,
    });

    if (error) {
      return {
        ok: false,
        message: getSignInErrorMessage(error),
      };
    }

    if (!data) {
      return {
        ok: false,
        message: "Unable to sign in. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Unable to reach the auth server. Please try again.",
    };
  }
}
