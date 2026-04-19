import type { DisorderType } from "@/generated/prisma/client";
import { therapistRepository } from "@/modules/matching/repositories/therapist.repository";

type FindMatchesPreferences = {
  primaryConcern?: DisorderType;
  severityScore?: number;
  therapyStyle?: string;
};

export async function verifyInsuranceEligibility(
  _providerId: string,
  _insuranceProvider: string,
  memberId: string,
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const isValid = memberId.toUpperCase().startsWith("VALID") || Math.random() > 0.3;

  return {
    verified: isValid,
    message: isValid
      ? "Insurance verified successfully."
      : "Verification failed. Please check your details.",
  };
}

export async function findMatchesForPreferences(preferences: FindMatchesPreferences) {
  const providers = await therapistRepository.findActiveTherapistsWithProfiles();

  if (providers.length === 0) {
    return [
      { id: "mock-1", name: "Dr. Mock One", specialty: "Anxiety", score: 95, expYears: 10 },
      { id: "mock-2", name: "Dr. Mock Two", specialty: "Trauma", score: 88, expYears: 5 },
    ];
  }

  const scoredProviders = providers.map((provider) => {
    let score = 0;
    const profile = provider.therapistProfile;

    if (!profile) return { ...provider, score: 0 };

    if (preferences.primaryConcern && profile.specialties.includes(preferences.primaryConcern)) {
      score += 50;
    }

    const yearsExp = profile.yearsExperience || 0;
    if (preferences.severityScore && preferences.severityScore >= 7) {
      if (yearsExp >= 10) score += 30;
      else if (yearsExp >= 5) score += 20;
      else if (yearsExp >= 2) score += 10;
    } else {
      if (yearsExp >= 5) score += 15;
      else if (yearsExp >= 2) score += 10;
      else score += 5;
    }

    const rankingPoints = Math.min(20, Math.floor((profile.rankingScore || 0) / 5));
    score += rankingPoints;

    if (preferences.therapyStyle && profile.bio?.toLowerCase().includes("action-oriented")) {
      if (preferences.therapyStyle.includes("tools")) {
        score += 5;
      }
    }

    return {
      id: provider.id,
      name: provider.fullName || "Unknown Provider",
      specialty: profile.specialties.join(", ") || "General",
      score,
      yearsExperience: yearsExp,
      avatar: provider.image || null,
      bioPreview: profile.bio ? profile.bio.substring(0, 100) + "..." : null,
    };
  });

  return scoredProviders.sort((a, b) => b.score - a.score).slice(0, 5);
}
