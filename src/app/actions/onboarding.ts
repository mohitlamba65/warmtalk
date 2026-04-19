"use server";

import { getNextOnboardingPathForUser, submitOnboardingStep } from "@/modules/auth/services/auth.service";
import { getSessionUser } from "@/modules/auth/services/session.service";
import type { ActionResult } from "@/modules/auth/types";
import { parseSignupRole, toSignupRole } from "@/modules/auth/types";

export async function getOnboardingRedirectForSession(): Promise<string | null> {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const role = toSignupRole(user.role);

  if (!role) {
    return null;
  }

  return getNextOnboardingPathForUser(user.id, role);
}

export async function submitOnboardingStepAction(input: {
  role: string;
  step: number;
  payload: unknown;
}): Promise<ActionResult<{ nextPath: string | null; completed: boolean }>> {
  const user = await getSessionUser();

  if (!user) {
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
    userId: user.id,
    role,
    step: input.step,
    payload: input.payload,
  });
}
