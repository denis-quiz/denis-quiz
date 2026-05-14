import { Suspense } from "react";
import SignInForm from "@/components/authentication/login";

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="p-6 text-white">Loading login...</p>}>
      <SignInForm />
    </Suspense>
  );
}
