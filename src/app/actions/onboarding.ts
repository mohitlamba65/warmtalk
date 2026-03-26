"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getNextOnboardingPathForUser, submitOnboardingStep } from "@/modules/auth/services/auth.service";
import type { ActionResult } from "@/modules/auth/types";
import { parseSignupRole, toSignupRole } from "@/modules/auth/types";

export async function getOnboardingRedirectForSession(): Promise<string | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const role = toSignupRole(session.user.role);

  if (!role) {
    return null;
  }

  return getNextOnboardingPathForUser(session.user.id, role);
}

export async function submitOnboardingStepAction(input: {
  role: string;
  step: number;
  payload: unknown;
}): Promise<ActionResult<{ nextPath: string | null; completed: boolean }>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      ok: false,
      error: {
        code: "UNAUTHENTICATED",
        message: "Please sign in to continue",
      },
    };
  }

  const role = parseSignupRole(input.role);

  if (!role) {
    return {
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: "Invalid onboarding role",
        fieldErrors: {
          role: ["Role must be either client or therapist"],
        },
      },
    };
  }

  return submitOnboardingStep({
    userId: session.user.id,
    role,
    step: input.step,
    payload: input.payload,
  });
}
