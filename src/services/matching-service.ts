import prisma from "@/lib/prisma";
import { DisorderType, Tier } from "@prisma/client";

export async function matchTherapist(userAnswers: Record<string, number>) {

  // 1. ANALYZE SYMPTOMS
  // If user scores high on "Anxiety" questions, tag them with ANXIETY.

  const detectedDisorders: DisorderType[] = determineDisorders(userAnswers);

  // 2. FIND THERAPISTS
  const matchedTherapists = await prisma.therapistProfile.findMany({
    where: {
      specialties: {
        hasSome: detectedDisorders // Must match at least one suspected disorder
      },
      isSubscriptionActive: true // Only show paying therapists
    },
    include: {
      user: { select: { fullName: true } } // Get their name
    }
  });

  // 3. APPLY TIERED SORTING
  // Elite shows first, then Premium, then Basic.
  const rankedResults = matchedTherapists.sort((a, b) => {
    const tierWeight = {
      [Tier.ELITE]: 3,
      [Tier.PREMIUM]: 2,
      [Tier.BASIC]: 1
    };
    return tierWeight[b.subscriptionTier] - tierWeight[a.subscriptionTier];
  });

  return rankedResults;
}

function determineDisorders(answers: any) {
  return [DisorderType.ANXIETY];
}