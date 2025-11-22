// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ROUTES = ["/admin"];
const PROTECTED_ROUTES = ["/home"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;

  // Your token (depending on how you named it)
  const token =
    request.cookies.get("auth_token")?.value ||
    request.cookies.get("token")?.value;

  // ❌ If no token and trying to access protected user area → send to login
  if (!token && PROTECTED_ROUTES.some((r) => path.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ❌ If no token and trying to access admin area → send to login
  if (!token && ADMIN_ROUTES.some((r) => path.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists → verify and check role
  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // 🔐 Admin guard
      if (
        ADMIN_ROUTES.some((r) => path.startsWith(r)) &&
        payload.role !== "admin"
      ) {
        return NextResponse.redirect(new URL("/home", request.url));
      }

      // Everything okay → continue
      return NextResponse.next();
    } catch (err) {
      // Token invalid → force login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Middleware applies to these routes:
export const config = {
  matcher: ["/home/:path*", "/admin/:path*"],
};
