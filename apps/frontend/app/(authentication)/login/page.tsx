"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SignInForm from "@/components/authentication/login";
import { errorToast } from "@/lib/toasts/error";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  useEffect(() => {
    if (reason === "auth") {
      errorToast("You must log in first");
    }
  }, [reason]);

  return <SignInForm />;
}
