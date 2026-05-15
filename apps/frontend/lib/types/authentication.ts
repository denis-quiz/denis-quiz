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

export type SignInResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

type SessionResponse = {
  session: {
    id: string;
    token: string;
    userId: string;
    expiresAt: string;
  } | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
};
