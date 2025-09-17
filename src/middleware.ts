import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const res = NextResponse.next()

  const protectedRoutes = ["/users", "/posts", "/books"];
  if (protectedRoutes.some((r) => req.nextUrl.pathname.startsWith(r))) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/users/:path*", "/posts/:path*", "/books/:path*"],
};
