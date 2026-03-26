// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ROUTES = ["/admin"];
const PROTECTED_ROUTES = ["/home", "/bookings"];
const ADMIN_PUBLIC_ROUTES = ["/admin/login", "/admin/register"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  const isAdminPublicRoute = ADMIN_PUBLIC_ROUTES.some((route) => path.startsWith(route));

  // Your token (depending on how you named it)
  const token =
    request.cookies.get("auth_token")?.value ||
    request.cookies.get("token")?.value;

  // ❌ If no token and trying to access protected user area → send to login
  if (!token && PROTECTED_ROUTES.some((r) => path.startsWith(r))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", path);
    return NextResponse.redirect(loginUrl);
  }

  // ❌ If no token and trying to access admin area → send to login
  if (!token && ADMIN_ROUTES.some((r) => path.startsWith(r)) && !isAdminPublicRoute) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("returnTo", path);
    return NextResponse.redirect(loginUrl);
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
        payload.role !== "admin" &&
        payload.role !== "superadmin" &&
        !isAdminPublicRoute
      ) {
        return NextResponse.redirect(new URL("/home", request.url));
      }

      if (isAdminPublicRoute && (payload.role === "admin" || payload.role === "superadmin")) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

      // Everything okay → continue
      return NextResponse.next();
    } catch {
      // Token invalid → force login
      const fallback = ADMIN_ROUTES.some((r) => path.startsWith(r)) ? "/admin/login" : "/login";
      return NextResponse.redirect(new URL(fallback, request.url));
    }
  }

  return NextResponse.next();
}

// Middleware applies to these routes:
export const config = {
  matcher: ["/home/:path*", "/bookings/:path*", "/admin/:path*"],
};
