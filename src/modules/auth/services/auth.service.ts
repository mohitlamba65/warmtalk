import type { z } from "zod";
import {
  ClientStepOneSchema,
  ClientStepTwoSchema,
  TherapistStepOneSchema,
  TherapistStepTwoSchema,
  getSchemaForRoleAndStep,
} from "@/modules/auth/schemas/schema";
import {
  getOrCreateOnboardingProgress,
  getUserRoleById,
  syncOnboardingProgressFromCompletion,
  upsertClientStepOne,
  upsertClientStepTwo,
  upsertTherapistStepOne,
  upsertTherapistStepTwo,
} from "@/modules/auth/repositories/user.repository";
import type { ActionResult, SignupRole } from "@/modules/auth/types";
import { toSignupRole } from "@/modules/auth/types";

export const roleStepRegistry: Record<SignupRole, number> = {
  client: 2,
  therapist: 2,
};

export function getOnboardingPath(role: SignupRole, step: number) {
  return `/onboarding/${role}/${step}`;
}

export async function getNextOnboardingPathForUser(userId: string, role: SignupRole) {
  const maxSteps = roleStepRegistry[role];
  const completion = await getOrCreateOnboardingProgress(userId, role, maxSteps);

  if (completion.completed) {
    return null;
  }

  return getOnboardingPath(role, completion.nextStep ?? 1);
}

function mapZodErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}

export async function submitOnboardingStep(input: {
  userId: string;
  role: SignupRole;
  step: number;
  payload: unknown;
}): Promise<ActionResult<{ nextPath: string | null; completed: boolean }>> {
  const user = await getUserRoleById(input.userId);

  if (!user) {
    return {
      ok: false,
      error: {
        code: "NOT_FOUND",
        message: "User not found",
      },
    };
  }

  const persistedRole = toSignupRole(user.role);

  if (!persistedRole || persistedRole !== input.role) {
    return {
      ok: false,
      error: {
        code: "FORBIDDEN",
        message: "Role cannot be changed after signup",
      },
    };
  }

  const maxSteps = roleStepRegistry[input.role];

  if (input.step < 1 || input.step > maxSteps) {
    return {
      ok: false,
      error: {
        code: "INVALID_STEP",
        message: "Invalid onboarding step",
      },
    };
  }

  const schema = getSchemaForRoleAndStep(input.role, input.step);

  if (!schema) {
    return {
      ok: false,
      error: {
        code: "INVALID_STEP",
        message: "Onboarding schema is not configured for this step",
      },
    };
  }

  const parsed = schema.safeParse(input.payload);

  if (!parsed.success) {
    return {
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: "Please check the form and try again",
        fieldErrors: mapZodErrors(parsed.error),
      },
    };
  }

  if (input.role === "client" && input.step === 1) {
    const clientStepOnePayload = ClientStepOneSchema.parse(input.payload);
    await upsertClientStepOne(input.userId, clientStepOnePayload);
  }

  if (input.role === "client" && input.step === 2) {
    const payload = ClientStepTwoSchema.parse(input.payload);
    await upsertClientStepTwo(input.userId, { dateOfBirth: new Date(payload.dateOfBirth) });
  }

  if (input.role === "therapist" && input.step === 1) {
    const therapistStepOnePayload = TherapistStepOneSchema.parse(input.payload);
    await upsertTherapistStepOne(input.userId, therapistStepOnePayload);
  }

  if (input.role === "therapist" && input.step === 2) {
    const therapistStepTwoPayload = TherapistStepTwoSchema.parse(input.payload);
    await upsertTherapistStepTwo(input.userId, therapistStepTwoPayload);
  }

  const completion = await syncOnboardingProgressFromCompletion(input.userId, input.role, maxSteps);

  if (completion.completed) {
    return {
      ok: true,
      data: {
        nextPath: "/dashboard",
        completed: true,
      },
    };
  }

  return {
    ok: true,
    data: {
      nextPath: getOnboardingPath(input.role, completion.nextStep ?? input.step + 1),
      completed: false,
    },
  };
}
