// services/matching-service.ts

import prisma from "@/lib/prisma";
import { DisorderType, Tier } from "@prisma/client";

export async function matchTherapist(userAnswers: Record<string, number>) {
  
  // 1. ANALYZE SYMPTOMS
  // Simple logic: If user scores high on "Anxiety" questions, tag them with ANXIETY.
  // (In real life, this would be more complex, but this is MVP).
  const detectedDisorders: DisorderType[] = determineDisorders(userAnswers);

  // 2. FIND THERAPISTS
  const matchedTherapists = await prisma.therapistProfile.findMany({
    where: {
      specialties: {
        hasSome: detectedDisorders // Must match at least one suspected disorder
      },
      subscriptionActive: true // Only show paying therapists
    },
    include: {
      user: { select: { fullName: true } } // Get their name
    }
  });

  // 3. APPLY TIERED SORTING (The Revenue Logic)
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
  // Logic to map answers to PDF disorders
  // Example: answers.q1 > 2 && answers.q2 > 2 -> return [DisorderType.DEPRESSION]
  return [DisorderType.ANXIETY]; // Placeholder
}