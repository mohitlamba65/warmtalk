import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role as "CLIENT" | "THERAPIST" | "ADMIN" | undefined;
    const { nextUrl } = req;
    const isAuthRoute = nextUrl.pathname.startsWith("/auth");

    // Allow next-auth API routes and public routes
    if (nextUrl.pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    // Redirect users away from auth pages if they're already logged in
    if (isAuthRoute) {
        if (isLoggedIn) {
            if (userRole === "CLIENT") {
                return NextResponse.redirect(new URL("/dashboard", nextUrl));
            } else if (userRole === "THERAPIST") {
                return NextResponse.redirect(new URL("/provider", nextUrl));
            } else if (userRole === "ADMIN") {
                return NextResponse.redirect(new URL("/admin", nextUrl));
            }
            return NextResponse.redirect(new URL("/", nextUrl));
        }
        return NextResponse.next();
    }

    // Handle protected route interception (via auth.config.ts callbacks)
    // For role-based redirects AFTER a successful login attempt and auth.config.ts has authorized the route.
    if (isLoggedIn) {
        const isDashboardPath = nextUrl.pathname.startsWith("/dashboard");
        const isProviderPath = nextUrl.pathname.startsWith("/provider");
        const isAdminPath = nextUrl.pathname.startsWith("/admin");

        if (isDashboardPath && userRole !== "CLIENT") {
            return NextResponse.redirect(new URL(userRole === "THERAPIST" ? "/provider" : "/", nextUrl));
        }

        if (isProviderPath && userRole !== "THERAPIST") {
            return NextResponse.redirect(new URL(userRole === "CLIENT" ? "/dashboard" : "/", nextUrl));
        }

        if (isAdminPath && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    }

    return NextResponse.next();
});

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
