import { useSession } from "@/lib/auth/auth-client"; // import the auth client

function User() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();
}

export default User;
