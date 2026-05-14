"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInUser } from "@/lib/auth/sign-in";
import { errorToast } from "@/lib/toasts/error";
import { successToast } from "@/lib/toasts/sucess";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get("reason") === "auth") {
      errorToast("You must log in first");
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      errorToast("Email and password are required.");
      return;
    }

    setIsSubmitting(true);

    const result = await signInUser(trimmedEmail, password);

    setIsSubmitting(false);

    if (!result.ok) {
      errorToast(result.message);
      return;
    }

    successToast("Signed in successfully.");
    const nextPath = searchParams.get("next");
    router.push(nextPath?.startsWith("/") ? nextPath : "/userprofile");
  }

  const inputClass =
    "block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400 outline outline-1 outline-white/10 focus:outline-indigo-500 sm:text-sm";

  const labelClass = "block text-sm font-medium text-white";

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign into your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <h4 className="mt-6 text-center text-sm text-white">
          If you don&#39;t have account yet{" "}
          <a href="/register" className="hover:text-indigo-300 text-blue-500">
            Click here
          </a>
        </h4>
      </div>
    </div>
  );
}
