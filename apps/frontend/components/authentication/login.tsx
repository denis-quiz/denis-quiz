"use client";

import { useState } from "react";
import { signInUser } from "@/lib/auth/sign-in";
import type { loginState } from "@/lib/types/authentication";
import { successToast } from "@/lib/toasts/sucess";
import { errorToast } from "@/lib/toasts/error";

export default function SignInForm() {
  const [form, setForm] = useState<loginState>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function updateField(field: keyof loginState, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await signInUser(form.email, form.password);

      if (result.error) {
        errorToast(result.error.message || "Invalid credentials");
        return;
      }

      successToast("Signed in successfully");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400 outline outline-1 outline-white/10 focus:outline-indigo-500 sm:text-sm";

  const labelClass = "block text-sm font-medium text-white";

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign into your account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
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
