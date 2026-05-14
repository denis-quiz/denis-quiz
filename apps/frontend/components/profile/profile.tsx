"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/lib/auth/use-require-auth";
import { getSessionProfile } from "@/lib/profile/get-sessionprofile";
import type { Profile } from "@/lib/types/profile";

export default function Profile() {
  const { session, isPending: isSessionPending } = useRequireAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    async function load() {
      try {
        const data = await getSessionProfile();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      }
    }

    void load();
  }, [session]);

  if (isSessionPending) {
    return <p>Loading session...</p>;
  }

  if (!session?.user) {
    return <p>Redirecting to login...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      <p>{session.user.email}</p>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
    </>
  );
}
