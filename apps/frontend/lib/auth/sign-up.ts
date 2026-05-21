import { signUp } from "./auth-client";

export async function signUpUser(
  email: string,
  password: string,
  name: string,
  image: string,
) {
  return signUp.email({
    email,
    password,
    name,
    image,
    callbackURL: "/dashboard",
  });
}
