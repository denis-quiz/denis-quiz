export type registerState = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  image: string;
};

export type loginState = {
  email: string;
  password: string;
};

export type SignInResult = {
  ok: boolean;
  message?: string;
};
