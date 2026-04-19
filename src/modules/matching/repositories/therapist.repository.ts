import { prisma } from "@/infrastructure/database/prisma";

export const therapistRepository = {
  async findActiveTherapistsWithProfiles() {
    return prisma.user.findMany({
      where: {
        role: "THERAPIST",
        isActive: true,
      },
      include: {
        therapistProfile: true,
      },
    });
  },
};

export type TherapistRepository = typeof therapistRepository;
