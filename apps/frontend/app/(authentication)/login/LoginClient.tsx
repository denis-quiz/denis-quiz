"use client";

import { useEffect } from "react";
import SignInForm from "@/components/authentication/login";
import { errorToast } from "@/lib/toasts/error";

export default function LoginClient() {
  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get("reason");

    if (reason === "auth") {
      errorToast("You must log in first");
    }
  }, []);

  return <SignInForm />;
}