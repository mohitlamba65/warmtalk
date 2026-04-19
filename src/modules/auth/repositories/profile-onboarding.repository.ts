import type { DisorderType } from "@/generated/prisma/client";
import { prisma } from "@/infrastructure/database/prisma";

export async function upsertClientProfileForRegistration(
  userId: string,
  data: { primaryDisorder: DisorderType; severityScore: number },
) {
  await prisma.clientProfile.upsert({
    where: { userId },
    update: {
      primaryDisorder: data.primaryDisorder,
      severityScore: data.severityScore,
    },
    create: {
      userId,
      primaryDisorder: data.primaryDisorder,
      severityScore: data.severityScore,
    },
  });
}

export async function upsertTherapistProfileForRegistration(
  userId: string,
  data: { primarySpecialty: DisorderType; yearsExperience: number; style: string },
) {
  await prisma.therapistProfile.upsert({
    where: { userId },
    update: {
      specialties: [data.primarySpecialty],
      yearsExperience: data.yearsExperience,
      bio: `Style Preference: ${data.style}`,
    },
    create: {
      userId,
      specialties: [data.primarySpecialty],
      yearsExperience: data.yearsExperience,
      bio: `Style Preference: ${data.style}`,
    },
  });
}

export async function markRoleOnboardingCompletedForRegistration(
  userId: string,
  role: "CLIENT" | "THERAPIST",
) {
  await prisma.onboardingProgress.upsert({
    where: { userId_role: { userId, role } },
    update: { isCompleted: true, currentStep: 3, completedAt: new Date() },
    create: {
      userId,
      role,
      isCompleted: true,
      currentStep: 3,
      totalSteps: 3,
      completedAt: new Date(),
    },
  });
}
