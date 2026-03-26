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

	const token =
		request.cookies.get("auth_token")?.value ||
		request.cookies.get("token")?.value;

	if (!token && PROTECTED_ROUTES.some((r) => path.startsWith(r))) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("returnTo", path);
		return NextResponse.redirect(loginUrl);
	}

	if (!token && ADMIN_ROUTES.some((r) => path.startsWith(r)) && !isAdminPublicRoute) {
		const loginUrl = new URL("/admin/login", request.url);
		loginUrl.searchParams.set("returnTo", path);
		return NextResponse.redirect(loginUrl);
	}

	if (token) {
		try {
			const { payload } = await jwtVerify(
				token,
				new TextEncoder().encode(process.env.JWT_SECRET)
			);

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

			return NextResponse.next();
		} catch {
			const fallback = ADMIN_ROUTES.some((r) => path.startsWith(r)) ? "/admin/login" : "/login";
			return NextResponse.redirect(new URL(fallback, request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/home/:path*", "/bookings/:path*", "/admin/:path*"],
};
