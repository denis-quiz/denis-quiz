"use client";

import { Settings } from "@/lib/types/settings";
import { signOutUser } from "@/lib/auth/sign-out";
import { buttonRedClass } from "@/lib/styles/form";
import { useRouter } from "next/navigation";

export default function SettingsList({ settings }: { settings: Settings }) {
  const router = useRouter();

  return (
    <>
      {settings.map((setting, index) => (
        <div key={index}>{setting.name}</div>
      ))}

      <button
        onClick={async () => {
          await signOutUser();
          router.push("/signin");
        }}
        className={buttonRedClass}
      >
        Logout
      </button>
    </>
  );
}
