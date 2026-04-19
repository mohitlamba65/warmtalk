import type { DisorderType } from "@/generated/prisma/client";
import {
  markRoleOnboardingCompletedForRegistration,
  upsertClientProfileForRegistration,
  upsertTherapistProfileForRegistration,
} from "@/modules/auth/repositories/profile-onboarding.repository";

export async function completeClientRegistrationProfile(
  userId: string,
  data: { primaryDisorder: DisorderType; severityScore: number; stylePreference: string },
) {
  await upsertClientProfileForRegistration(userId, {
    primaryDisorder: data.primaryDisorder,
    severityScore: data.severityScore,
  });

  await markRoleOnboardingCompletedForRegistration(userId, "CLIENT");
}

export async function completeTherapistRegistrationProfile(
  userId: string,
  data: { primarySpecialty: DisorderType; yearsExperience: number; style: string },
) {
  await upsertTherapistProfileForRegistration(userId, data);
  await markRoleOnboardingCompletedForRegistration(userId, "THERAPIST");
}
