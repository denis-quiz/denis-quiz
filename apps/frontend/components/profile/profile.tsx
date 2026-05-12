"use client";

import { useEffect, useState } from "react";
import { getSessionProfile } from "@/lib/profile/get-sessionprofile";
import type { Profile } from "@/lib/types/profile";

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getSessionProfile();
      setProfile(data);
    }

    load();
  }, []);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
    </>
  );
}
