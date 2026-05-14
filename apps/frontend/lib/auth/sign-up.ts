import { signUp } from "./auth-client";

export async function signUpUser(
  email: string,
  password: string,
  name: string,
  image: string,
) {
  return signUp.email({
    email, // user email address
    password, // user password -> min 8 characters by default
    name, // user display name
    image, // User image URL (optional)
    callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
  });
}
