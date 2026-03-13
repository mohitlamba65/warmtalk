import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isDashboardPath = nextUrl.pathname.startsWith("/dashboard");
            const isProviderPath = nextUrl.pathname.startsWith("/provider");
            const isAdminPath = nextUrl.pathname.startsWith("/admin");

            if (isDashboardPath || isProviderPath || isAdminPath) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true; // Let everyone access other pages (like landing page, login page)
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    providers: [Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })],
} satisfies NextAuthConfig;
