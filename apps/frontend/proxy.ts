import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getApiUrl } from "@/lib/api";
import { SessionResponse } from "better-auth/client";

const PUBLIC_PATHS = ["/login", "/register"];

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/login?reason=auth", request.url));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
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

  const payload: SessionResponse = await sessionResponse.json();

  if (!payload?.session || !payload?.user) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/userprofile/:path*", "/quiz/:path*", "/settings/:path*"],
};
