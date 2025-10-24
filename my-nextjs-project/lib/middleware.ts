// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  // If user tries to access /home but isn’t authenticated, redirect to /login
  if (!token && request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Define which routes use this middleware
export const config = {
  matcher: ["/home/:path*"],
};
