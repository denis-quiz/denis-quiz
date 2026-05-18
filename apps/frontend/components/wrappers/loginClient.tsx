// app/login/LoginClient.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { errorToast } from "@/lib/toasts/error";
import SignInForm from "@/components/authentication/login";
export default function LoginClient() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  useEffect(() => {
    if (reason === "auth") {
      errorToast("You must log in first");
    }
  }, [reason]);

  return <SignInForm />;
}
