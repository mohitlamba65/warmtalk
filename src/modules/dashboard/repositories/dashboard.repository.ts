import { prisma } from "@/infrastructure/database/prisma";

export const dashboardRepository = {
    async getClientUpcomingSessions(userId: string) {
        const clientProfile = await prisma.clientProfile.findUnique({ where: { userId } });
        if (!clientProfile) return [];

        return prisma.therapySession.findMany({
            where: {
                clientId: clientProfile.id,
                startTime: { gte: new Date() },
                status: "SCHEDULED"
            },
            include: {
                therapist: {
                    include: { user: true }
                }
            },
            orderBy: { startTime: 'asc' },
            take: 5
        });
    },

    async getAssignedTherapist(userId: string) {
        const clientProfile = await prisma.clientProfile.findUnique({ where: { userId } });
        if (!clientProfile) return null;

        // Since there's no direct "assignedTherapist" relation, we safely infer it 
        // from the upcoming session for the MVP dashboard feature.
        const nextSession = await prisma.therapySession.findFirst({
            where: { clientId: clientProfile.id }, // Any session attached to client
            include: {
                therapist: { include: { user: true } }
            },
            orderBy: { startTime: 'desc' }
        });
        
        return nextSession?.therapist || null;
    },

    async getUnreadMessageCount(userId: string) {
        return prisma.chatMessage.count({
            where: {
                recipientId: userId,
                isRead: false
            }
        });
    }
};
