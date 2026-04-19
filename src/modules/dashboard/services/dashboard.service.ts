import { DisorderType } from "@/generated/prisma/client";
import type {
    AssignedTherapistRecord,
    UpcomingSessionRecord,
} from "@/modules/dashboard/repositories/dashboard.repository";

export interface DashboardRepos {
    getClientUpcomingSessions: (userId: string) => Promise<UpcomingSessionRecord[]>;
    getAssignedTherapist: (userId: string) => Promise<AssignedTherapistRecord | null>;
    getUnreadMessageCount: (userId: string) => Promise<number>;
}

export interface DashboardStatsDTO {
    upcomingSessions: Array<{
        id: string;
        startTime: Date;
        endTime: Date;
        status: string;
        meetingLink: string | null;
        therapistName: string;
        therapistSpecialties: DisorderType[];
    }>;
    assignedTherapist: {
        id: string;
        name: string;
        yearsExperience: number | null;
        bio: string | null;
        specialties: DisorderType[];
        avatar: string | null;
    } | null;
    unreadCount: number;
}

export async function getUserDashboardStats(userId: string, repos: DashboardRepos): Promise<DashboardStatsDTO> {
    const [upcomingSessions, assignedTherapist, unreadCount] = await Promise.all([
        repos.getClientUpcomingSessions(userId),
        repos.getAssignedTherapist(userId),
        repos.getUnreadMessageCount(userId)
    ]);

    // Apply any specific business formatting rules here (e.g. mapping internal data structures to clean DTOs)
    return {
        upcomingSessions: upcomingSessions.map(session => ({
            id: session.id,
            startTime: session.startTime,
            endTime: session.endTime,
            status: session.status,
            meetingLink: session.meetingLink,
            therapistName: session.therapist?.user?.name || "Unknown Therapist",
            therapistSpecialties: session.therapist?.specialties || []
        })),
        assignedTherapist: assignedTherapist ? {
            id: assignedTherapist.id,
            name: assignedTherapist.user?.name || "Unknown Therapist",
            yearsExperience: assignedTherapist.yearsExperience,
            bio: assignedTherapist.bio,
            specialties: assignedTherapist.specialties,
            avatar: assignedTherapist.user?.image || null,
        } : null,
        unreadCount
    };
}
