import { prisma } from "@/infrastructure/database/prisma";
import type { DisorderTypeValue } from "@/modules/auth/schemas/schema";
import type { SignupRole } from "@/modules/auth/types";
import { toPersistedRole } from "@/modules/auth/types";

export async function getUserRoleById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
}

export async function getClientProfileCompletion(userId: string) {
  const profile = await prisma.clientProfile.findUnique({
    where: { userId },
    select: {
      dateOfBirth: true,
      primaryDisorder: true,
      severityScore: true,
    },
  });

  if (!profile) {
    return {
      completed: false,
      nextStep: 1,
    };
  }

  if (!profile.primaryDisorder || !profile.severityScore) {
    return {
      completed: false,
      nextStep: 1,
    };
  }

  if (!profile.dateOfBirth) {
    return {
      completed: false,
      nextStep: 2,
    };
  }

  return {
    completed: true,
    nextStep: null,
  };
}

export async function getTherapistProfileCompletion(userId: string) {
  const profile = await prisma.therapistProfile.findUnique({
    where: { userId },
    select: {
      yearsExperience: true,
      licenseNumber: true,
      specialties: true,
      bio: true,
    },
  });

  if (!profile) {
    return {
      completed: false,
      nextStep: 1,
    };
  }

  if (
    profile.yearsExperience === null ||
    !profile.licenseNumber ||
    profile.specialties.length === 0
  ) {
    return {
      completed: false,
      nextStep: 1,
    };
  }

  if (!profile.bio) {
    return {
      completed: false,
      nextStep: 2,
    };
  }

  return {
    completed: true,
    nextStep: null,
  };
}

export async function upsertClientStepOne(
  userId: string,
  payload: { primaryDisorder: DisorderTypeValue; severityScore: number },
) {
  return prisma.clientProfile.upsert({
    where: { userId },
    update: {
      primaryDisorder: payload.primaryDisorder,
      severityScore: payload.severityScore,
    },
    create: {
      userId,
      primaryDisorder: payload.primaryDisorder,
      severityScore: payload.severityScore,
    },
  });
}

export async function upsertClientStepTwo(
  userId: string,
  payload: { dateOfBirth: Date },
) {
  return prisma.clientProfile.upsert({
    where: { userId },
    update: {
      dateOfBirth: payload.dateOfBirth,
    },
    create: {
      userId,
      dateOfBirth: payload.dateOfBirth,
    },
  });
}

export async function upsertTherapistStepOne(
  userId: string,
  payload: {
    yearsExperience: number;
    licenseNumber: string;
    specialties: DisorderTypeValue[];
  },
) {
  return prisma.therapistProfile.upsert({
    where: { userId },
    update: {
      yearsExperience: payload.yearsExperience,
      licenseNumber: payload.licenseNumber,
      specialties: payload.specialties,
    },
    create: {
      userId,
      yearsExperience: payload.yearsExperience,
      licenseNumber: payload.licenseNumber,
      specialties: payload.specialties,
    },
  });
}

export async function upsertTherapistStepTwo(
  userId: string,
  payload: { bio: string },
) {
  return prisma.therapistProfile.upsert({
    where: { userId },
    update: {
      bio: payload.bio,
    },
    create: {
      userId,
      bio: payload.bio,
      specialties: [],
    },
  });
}

export async function getOnboardingCompletion(userId: string, role: SignupRole) {
  if (role === "client") {
    return getClientProfileCompletion(userId);
  }

  return getTherapistProfileCompletion(userId);
}

type CompletionState = {
  completed: boolean;
  nextStep: number | null;
};

function completionToProgressState(completion: CompletionState, maxSteps: number) {
  if (completion.completed) {
    return {
      currentStep: maxSteps,
      isCompleted: true,
      completedAt: new Date(),
      nextStep: null,
    };
  }

  const nextStep = completion.nextStep ?? 1;

  return {
    currentStep: Math.max(1, Math.min(nextStep, maxSteps)),
    isCompleted: false,
    completedAt: null,
    nextStep,
  };
}

export async function getOrCreateOnboardingProgress(
  userId: string,
  role: SignupRole,
  maxSteps: number,
) {
  const persistedRole = toPersistedRole(role);

  const existing = await prisma.onboardingProgress.findUnique({
    where: {
      userId_role: {
        userId,
        role: persistedRole,
      },
    },
  });

  if (existing) {
    return {
      completed: existing.isCompleted,
      nextStep: existing.isCompleted ? null : Math.max(1, Math.min(existing.currentStep, maxSteps)),
      currentStep: existing.currentStep,
    };
  }

  const completion = await getOnboardingCompletion(userId, role);
  const bootstrapped = completionToProgressState(completion, maxSteps);

  const created = await prisma.onboardingProgress.create({
    data: {
      userId,
      role: persistedRole,
      currentStep: bootstrapped.currentStep,
      totalSteps: maxSteps,
      isCompleted: bootstrapped.isCompleted,
      completedAt: bootstrapped.completedAt,
    },
  });

  return {
    completed: created.isCompleted,
    nextStep: created.isCompleted ? null : created.currentStep,
    currentStep: created.currentStep,
  };
}

export async function syncOnboardingProgressFromCompletion(
  userId: string,
  role: SignupRole,
  maxSteps: number,
) {
  const persistedRole = toPersistedRole(role);
  const completion = await getOnboardingCompletion(userId, role);
  const state = completionToProgressState(completion, maxSteps);

  const updated = await prisma.onboardingProgress.upsert({
    where: {
      userId_role: {
        userId,
        role: persistedRole,
      },
    },
    update: {
      currentStep: state.currentStep,
      totalSteps: maxSteps,
      isCompleted: state.isCompleted,
      completedAt: state.completedAt,
    },
    create: {
      userId,
      role: persistedRole,
      currentStep: state.currentStep,
      totalSteps: maxSteps,
      isCompleted: state.isCompleted,
      completedAt: state.completedAt,
    },
  });

  return {
    completed: updated.isCompleted,
    nextStep: updated.isCompleted ? null : updated.currentStep,
    currentStep: updated.currentStep,
  };
}
