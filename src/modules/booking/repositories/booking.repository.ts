import { prisma } from "@/infrastructure/database/prisma";

export const bookingRepository = {
    async getClientProfileByUserId(userId: string) {
        return prisma.clientProfile.findUnique({
            where: { userId }
        });
    },

    async getSessionsForDate(therapistId: string, date: Date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        return prisma.therapySession.findMany({
            where: {
                therapistId,
                startTime: { gte: start, lte: end },
                status: { not: "CANCELLED" }
            }
        });
    },

    async checkConflict(therapistId: string, startTime: Date, endTime: Date) {
        const conflict = await prisma.therapySession.findFirst({
            where: {
                therapistId,
                status: { not: "CANCELLED" },
                OR: [
                    {
                        startTime: { lt: endTime },
                        endTime: { gt: startTime }
                    }
                ]
            }
        });
        return !!conflict;
    },

    async createSession(clientId: string, therapistId: string, startTime: Date, endTime: Date) {
        return prisma.therapySession.create({
            data: {
                clientId,
                therapistId,
                startTime,
                endTime,
                status: "SCHEDULED"
            }
        });
    }
};

export type BookingRepository = typeof bookingRepository;
