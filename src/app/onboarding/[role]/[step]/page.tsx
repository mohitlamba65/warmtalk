import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { RoleOnboardingStepForm } from "@/components/auth/RoleOnboardingStepForm";
import { getNextOnboardingPathForUser, roleStepRegistry } from "@/modules/auth/services/auth.service";
import { parseSignupRole, toSignupRole } from "@/modules/auth/types";

type Props = {
  params: Promise<{ role: string; step: string }>;
};

export default async function OnboardingRoleStepPage({ params }: Props) {
  const routeParams = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/register?reason=complete-signup");
  }

  const requestedRole = parseSignupRole(routeParams.role);
  const sessionRole = toSignupRole(session.user.role);

  if (!sessionRole) {
    redirect("/auth/register?reason=complete-signup");
  }

  if (!requestedRole) {
    const path = await getNextOnboardingPathForUser(session.user.id, sessionRole);
    redirect(path ?? "/dashboard");
  }

  if (requestedRole !== sessionRole) {
    const path = await getNextOnboardingPathForUser(session.user.id, sessionRole);
    redirect(path ?? "/dashboard");
  }

  const parsedStep = Number(routeParams.step);

  if (!Number.isInteger(parsedStep) || parsedStep < 1 || parsedStep > roleStepRegistry[sessionRole]) {
    const path = await getNextOnboardingPathForUser(session.user.id, sessionRole);
    redirect(path ?? "/dashboard");
  }

  const nextPath = await getNextOnboardingPathForUser(session.user.id, sessionRole);

  if (!nextPath) {
    redirect("/dashboard");
  }

  const allowedStep = Number(nextPath.split("/").at(-1) ?? "1");

  if (parsedStep > allowedStep) {
    redirect(nextPath);
  }

  return (
    <div className="min-h-screen bg-soft-bg flex items-center justify-center p-4">
      <RoleOnboardingStepForm role={sessionRole} step={parsedStep} />
    </div>
  );
}
