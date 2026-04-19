
"use server";

import type { DisorderType } from "@/generated/prisma/client";
import {
    findMatchesForPreferences,
    verifyInsuranceEligibility,
} from "@/modules/matching/services/matching.service";

export async function verifyInsurance(providerId: string, insuranceProvider: string, memberId: string) {
    return verifyInsuranceEligibility(providerId, insuranceProvider, memberId);
}

export async function findMatches(preferences: {
    primaryConcern?: DisorderType;
    severityScore?: number;
    therapyStyle?: string;
}) {
    return findMatchesForPreferences(preferences);
}
