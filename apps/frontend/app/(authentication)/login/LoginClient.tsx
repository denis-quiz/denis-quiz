"use client";

import { useSearchParams } from "next/navigation";
import SignInForm from "@/components/authentication/login";
import { errorToast } from "@/lib/toasts/error";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  if (reason === "auth") {
    errorToast("You must log in first");
  }

  return <SignInForm />;
}