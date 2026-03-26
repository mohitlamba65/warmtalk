import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getNextOnboardingPathForUser } from "@/modules/auth/services/auth.service";
import { toSignupRole } from "@/modules/auth/types";

export default async function OnboardingEntryPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/onboarding/client/1");
  }

  const role = toSignupRole(session.user.role);

  if (!role) {
    redirect("/dashboard");
  }

  const nextPath = await getNextOnboardingPathForUser(session.user.id, role);
  redirect(nextPath ?? "/dashboard");
}
