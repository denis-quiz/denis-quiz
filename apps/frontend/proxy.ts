import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getApiUrl } from "@/lib/api";

const PUBLIC_PATHS = ["/login", "/register"];

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/login?reason=auth", request.url));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionResponse = await fetch(`${getApiUrl()}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  if (!sessionResponse.ok) {
    return redirectToLogin(request);
  }

  const payload = (await sessionResponse.json()) as {
    session?: { user?: unknown } | null;
  } | null;

  if (!payload?.session?.user) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/userprofile",
    "/userprofile/:path*",
    "/quizcreate",
    "/quizcreate/:path*",
    "/settings",
    "/settings/:path*",
  ],
};
