
import { PrismaClient, DisorderType } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export async function verifyInsurance(providerId: string, insuranceProvider: string, memberId: string) {
    // Simulate external API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock logic: randomly return true for now, or true if memberId starts with 'VALID'
    const isValid = memberId.toUpperCase().startsWith("VALID") || Math.random() > 0.3;

    return {
        verified: isValid,
        message: isValid ? "Insurance verified successfully." : "Verification failed. Please check your details.",
    };
}

export async function findMatches(preferences: {
    primaryConcern?: DisorderType;
    severityScore?: number;
    therapyStyle?: string;
}) {
    // 1. Fetch matching providers from the database
    // We only fetch active users with the THERAPIST role.
    const providers = await prisma.user.findMany({
        where: {
            role: "THERAPIST",
            isActive: true,
        },
        include: {
            therapistProfile: true
        },
    });

    if (providers.length === 0) {
        // Fallback for empty DB scenario (dev/staging)
        return [
            { id: "mock-1", name: "Dr. Mock One", specialty: "Anxiety", score: 95, expYears: 10 },
            { id: "mock-2", name: "Dr. Mock Two", specialty: "Trauma", score: 88, expYears: 5 },
        ];
    }

    // 2. Score each provider based on the matching logic
    const scoredProviders = providers.map(provider => {
        let score = 0;
        const profile = provider.therapistProfile;

        if (!profile) return { ...provider, score: 0 };

        // A. Base Match: Specialty (50 points)
        if (preferences.primaryConcern && profile.specialties.includes(preferences.primaryConcern)) {
            score += 50;
        }

        // B. Experience Match (up to 30 points)
        // If the user's severity is high, therapists with more experience get a boost.
        const yearsExp = profile.yearsExperience || 0;
        if (preferences.severityScore && preferences.severityScore >= 7) {
            // High severity: strongly emphasize experience
            if (yearsExp >= 10) score += 30;
            else if (yearsExp >= 5) score += 20;
            else if (yearsExp >= 2) score += 10;
        } else {
            // General severity: mild emphasis on experience, but don't penalize newer therapists heavily
            if (yearsExp >= 5) score += 15;
            else if (yearsExp >= 2) score += 10;
            else score += 5;
        }

        // C. Quality Match (up to 20 points)
        // Normalize rankingScore assuming typical scores max out around 100 for this MVP
        const rankingPoints = Math.min(20, Math.floor((profile.rankingScore || 0) / 5));
        score += rankingPoints;

        // D. Tie-breaker style matching (Soft +5 points if styled matched somehow)
        // E.g., if we ever add bio keyword matching
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
            bioPreview: profile.bio ? profile.bio.substring(0, 100) + "..." : null
        };
    });

    // 3. Sort by score descending and return top 5
    return scoredProviders
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}
