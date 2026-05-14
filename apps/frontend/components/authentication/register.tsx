"use client";

import { useState } from "react";
import { signUpUser } from "@/lib/auth/sign-up";
import { buttonClass, inputClass, labelClass } from "@/lib/styles/form";
import { errorToast } from "@/lib/toasts/error";
import { successToast } from "@/lib/toasts/sucess";
import { registerState } from "@/lib/types/authentication";

export default function SignUpForm() {
  const [form, setForm] = useState<registerState>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  function updateField(field: keyof registerState, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      errorToast("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await signUpUser(form.email, form.password, form.name, form.image);

      successToast("Account created successfully");

      setForm({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        image: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorToast(err.message);
      } else {
        errorToast("Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className={labelClass}>Name</label>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className={labelClass}>Confirm password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>Image URL (optional)</label>
            <input
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <button type="submit" className={buttonClass} disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
