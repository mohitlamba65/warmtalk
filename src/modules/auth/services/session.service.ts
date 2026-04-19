import { headers } from "next/headers";
import { auth } from "@/lib/auth";

type BetterAuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
export type AuthenticatedUser = BetterAuthSession["user"];

export async function getSessionUser(): Promise<AuthenticatedUser | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}

export async function requireSessionUser(): Promise<AuthenticatedUser> {
  const user = await getSessionUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
