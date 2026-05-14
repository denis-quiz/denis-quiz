"use client";

import { Settings } from "@/lib/types/settings";
import { useRequireAuth } from "@/lib/auth/use-require-auth";
import { signOutUser } from "@/lib/auth/sign-out";
import { buttonRedClass } from "@/lib/styles/form";
import { useRouter } from "next/navigation";

export default function SettingsList({ settings }: { settings: Settings }) {
  const router = useRouter();
  const { session, isPending } = useRequireAuth();

  if (isPending) {
    return <p>Loading session...</p>;
  }

  if (!session?.user) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <>
      {settings.map((setting, index) => (
        <div key={index}>{setting.name}</div>
      ))}

      <button
        onClick={async () => {
          await signOutUser();
          router.push("/login");
        }}
        className={buttonRedClass}
      >
        Logout
      </button>
    </>
  );
}
