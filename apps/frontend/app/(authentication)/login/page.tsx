"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SignInForm from "@/components/authentication/login";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  useEffect(() => {
    if (reason === "auth") {
      alert("You must log in first");
    }
  }, [reason]);

  return <SignInForm />;
}
