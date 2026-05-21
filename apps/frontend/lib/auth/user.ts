import { useSession } from "@/lib/auth/auth-client";

function User() {
  const { data: session, isPending, error, refetch } = useSession();
}

export default User;
