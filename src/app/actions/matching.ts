"use server";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

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

export async function findMatches(clientId: string, preferences: { specialty?: string; insurance?: string }) {
    // In a real app, this would use vector search or complex filtering
    // For now, return all therapists and calculate a mock score

    // Note: Since we don't have real data in DB yet, we return mock data structure
    // mapped to what the UI expects, or perform a DB query if we seeded data.

    // Mock fallback since DB is not connected
    /*
    const providers = await prisma.user.findMany({
      where: { role: "PROVIDER" },
      include: { therapistProfile: true },
    });
    */
    const providers: any[] = []; // Mock empty

    if (providers.length === 0) {
        // Return mock if DB empty
        return [
            { id: "1", name: "Dr. Mock One", specialty: "Anxiety", score: 95 },
            { id: "2", name: "Dr. Mock Two", specialty: "Trauma", score: 88 },
        ];
    }

    // Calculate scores (Mock algorithm)
    return providers.map(p => ({
        id: p.id,
        name: p.name || "Unknown Provider",
        specialty: p.therapistProfile?.specialties || "General",
        score: Math.floor(Math.random() * 20) + 80, // Random score 80-99
    })).sort((a, b) => b.score - a.score);
}
