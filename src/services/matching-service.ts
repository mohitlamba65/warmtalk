import { prisma } from '../lib/prisma'
import { DisorderType, SubscriptionTier } from '../generated/client'

// Type definition for the input (Map of QuestionID -> SelectedOptionID)
interface UserResponses {
  [questionId: string]: string
}

export async function matchTherapist(responses: UserResponses) {

  // 1. FETCH DETAILS FROM DB
  // We need to know which disorder each question belongs to and how many points the option is worth.
  const questionIds = Object.keys(responses)

  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    include: { options: true }
  })

  // 2. CALCULATE SCORES PER DISORDER
  const scores: Partial<Record<DisorderType, number>> = {}

  for (const q of questions) {
    const selectedOptionId = responses[q.id]
    const selectedOption = q.options.find(opt => opt.id === selectedOptionId)

    if (selectedOption) {
      // Logic: Option Score * Question Weight
      const points = selectedOption.scoreValue * q.weight

      // Add to the specific disorder bucket (e.g., MOOD_DISORDERS)
      scores[q.category] = (scores[q.category] || 0) + points
    }
  }

  // 3. DETERMINE PRIMARY DISORDER
  // Find the category with the highest score
  let maxScore = 0
  let primaryDisorder: DisorderType | null = null

  Object.entries(scores).forEach(([disorder, score]) => {
    // @ts-ignore: Object.entries typing issue with enums
    const typedScore = score as number
    if (typedScore > maxScore) {
      maxScore = typedScore
      primaryDisorder = disorder as DisorderType
    }
  })

  // Fallback if no score computed or no primary disorder found
  if (!primaryDisorder) {
    // Optional: handle "no diagnosis" or low confidence case
    // For now, returning null/empty matches or throwing is an option, 
    // but let's just log and continue or return empty.
    // throw new Error("No specific disorder identified. Please provide more answers.")
    console.warn("No primary disorder identified from responses.")
    return { matches: [], confidenceScore: 0, diagnosis: null }
  }

  console.log(`🔎 Match found for: ${primaryDisorder} (Score: ${maxScore})`)

  // 4. FIND & RANK THERAPISTS (The Revenue Engine)
  const therapists = await prisma.therapistProfile.findMany({
    where: {
      specialties: {
        has: primaryDisorder // Must specialize in the user's issue
      },
      isSubscriptionActive: true // ONLY show paying therapists
    },
    include: {
      user: {
        select: { fullName: true, email: true } // Return safe public info
      }
    }
  })

  // 5. SORT BY SUBSCRIPTION TIER (Elite -> Premium -> Basic)
  // This ensures your highest paying customers get the most visibility.
  const rankedTherapists = therapists.sort((a, b) => {
    const tierWeight: Record<SubscriptionTier, number> = {
      [SubscriptionTier.ELITE]: 3,
      [SubscriptionTier.PREMIUM]: 2,
      [SubscriptionTier.BASIC]: 1
    }
    // Sort descending (3 before 1)
    return tierWeight[b.subscriptionTier] - tierWeight[a.subscriptionTier]
  })

  return {
    diagnosis: primaryDisorder,
    confidenceScore: maxScore,
    matches: rankedTherapists
  }
}