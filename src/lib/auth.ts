import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/infrastructure/database/prisma";

const betterAuthUrl = process.env.BETTER_AUTH_URL;

if (!betterAuthUrl) {
  throw new Error("BETTER_AUTH_URL is required for Better Auth OAuth callbacks.");
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  baseURL: betterAuthUrl,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // accessType: "offline",
      // prompt: "select_account consent",
    },
  },
});
