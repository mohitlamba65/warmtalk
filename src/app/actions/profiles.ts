"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { headers } from "next/headers";
import { DisorderType } from "@prisma/client";

export async function saveClientProfile(data: { primaryDisorder: DisorderType; severityScore: number; stylePreference: string }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Unauthorized");

    await prisma.clientProfile.upsert({
        where: { userId: session.user.id },
        update: { 
            primaryDisorder: data.primaryDisorder, 
            severityScore: data.severityScore 
        },
        create: { 
            userId: session.user.id, 
            primaryDisorder: data.primaryDisorder, 
            severityScore: data.severityScore 
        }
    });

    await prisma.onboardingProgress.upsert({
        where: { userId_role: { userId: session.user.id, role: "CLIENT" } },
        update: { isCompleted: true, currentStep: 3, completedAt: new Date() },
        create: { userId: session.user.id, role: "CLIENT", isCompleted: true, currentStep: 3, totalSteps: 3, completedAt: new Date() }
    });

    return { success: true };
}

export async function saveTherapistProfile(data: { primarySpecialty: DisorderType; yearsExperience: number; style: string }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Unauthorized");

    await prisma.therapistProfile.upsert({
        where: { userId: session.user.id },
        update: { 
            specialties: [data.primarySpecialty], 
            yearsExperience: data.yearsExperience, 
            bio: `Style Preference: ${data.style}` 
        },
        create: { 
            userId: session.user.id, 
            specialties: [data.primarySpecialty], 
            yearsExperience: data.yearsExperience, 
            bio: `Style Preference: ${data.style}` 
        }
    });

    await prisma.onboardingProgress.upsert({
        where: { userId_role: { userId: session.user.id, role: "THERAPIST" } },
        update: { isCompleted: true, currentStep: 3, completedAt: new Date() },
        create: { userId: session.user.id, role: "THERAPIST", isCompleted: true, currentStep: 3, totalSteps: 3, completedAt: new Date() }
    });

    return { success: true };
}
