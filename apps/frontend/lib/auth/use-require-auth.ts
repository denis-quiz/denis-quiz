"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";

export function useRequireAuth() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending || session?.user) {
      return;
    }

    router.replace("/login?reason=auth");
  }, [isPending, router, session]);

  return { session, isPending };
}
