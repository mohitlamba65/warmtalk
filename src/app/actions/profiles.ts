"use server";

import type { DisorderType } from "@/generated/prisma/client";
import {
    completeClientRegistrationProfile,
    completeTherapistRegistrationProfile,
} from "@/modules/auth/services/profile-onboarding.service";
import { requireSessionUser } from "@/modules/auth/services/session.service";

export async function saveClientProfile(data: { primaryDisorder: DisorderType; severityScore: number; stylePreference: string }) {
    const user = await requireSessionUser();

    await completeClientRegistrationProfile(user.id, data);

    return { success: true };
}

export async function saveTherapistProfile(data: { primarySpecialty: DisorderType; yearsExperience: number; style: string }) {
    const user = await requireSessionUser();

    await completeTherapistRegistrationProfile(user.id, data);

    return { success: true };
}
