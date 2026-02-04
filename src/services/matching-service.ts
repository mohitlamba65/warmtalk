import { prisma } from "@/lib/prisma";
import { DisorderType, SubscriptionTier } from "@prisma/client";

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
      [SubscriptionTier.ELITE]: 3,
      [SubscriptionTier.PREMIUM]: 2,
      [SubscriptionTier.BASIC]: 1
    };
    return tierWeight[b.subscriptionTier] - tierWeight[a.subscriptionTier];
  });

  return rankedResults;
}

function determineDisorders(answers: any) {
  return [DisorderType.ANXIETY_DISORDERS];
}