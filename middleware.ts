import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

const ADMIN_ROUTES = ["/admin"];
const PROTECTED_ROUTES = ["/home", "/bookings"];
const ADMIN_PUBLIC_ROUTES = ["/admin/login", "/admin/register"];

function getAuthToken(request: NextRequest): string | null {
	const tokenCookieNames = ["auth_token", "token", "access_token", "accessToken", "jwt"];

	for (const cookieName of tokenCookieNames) {
		const value = request.cookies.get(cookieName)?.value;
		if (value) {
			return value;
		}
	}

	return null;
}

function getRoleFromToken(token: string): string | null {
	try {
		const payload = decodeJwt(token);
		const role = payload.role;
		return typeof role === "string" ? role : null;
	} catch {
		return null;
	}
}

export async function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const path = url.pathname;
	const isAdminPublicRoute = ADMIN_PUBLIC_ROUTES.some((route) => path.startsWith(route));

	const token = getAuthToken(request);

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
		const role = getRoleFromToken(token);

		if (
			ADMIN_ROUTES.some((r) => path.startsWith(r)) &&
			!isAdminPublicRoute &&
			role !== null &&
			role !== "admin" &&
			role !== "superadmin"
		) {
			return NextResponse.redirect(new URL("/home", request.url));
		}

		if (isAdminPublicRoute && (role === "admin" || role === "superadmin")) {
			return NextResponse.redirect(new URL("/admin/dashboard", request.url));
		}

		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/home/:path*", "/bookings/:path*", "/admin/:path*"],
};
