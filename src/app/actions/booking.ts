"use server";

import { bookingService } from "@/modules/booking/services/booking.service";
import { bookingRepository } from "@/modules/booking/repositories/booking.repository";
import { emailService } from "@/modules/booking/services/email.service";
import { requireSessionUser } from "@/modules/auth/services/session.service";

/**
 * Returns available ISO date strings for a therapist on a given date.
 */
export async function getTherapistAvailabilityAction(therapistId: string, dateIso: string) {
    await requireSessionUser();

    const targetDate = new Date(dateIso);
    
    // Using decoupled service by injecting the repository dependency
    return bookingService.getTherapistAvailability(
        therapistId, 
        targetDate, 
        bookingRepository
    );
}

/**
 * Books a session slot and dispatches confirmation notifications.
 */
export async function bookSessionAction(therapistId: string, slotStartIso: string) {
    const user = await requireSessionUser();

    // Resolve domain identity through repository so action stays orchestration-only.
    const clientProfile = await bookingRepository.getClientProfileByUserId(user.id);

    if (!clientProfile) {
        throw new Error("Client profile not found. Complete onboarding first.");
    }

    const slotStart = new Date(slotStartIso);
    
    // Inject all dependencies into the decoupled module
    const therapySession = await bookingService.bookSession(
        clientProfile.id,
        therapistId,
        slotStart,
        bookingRepository,
        emailService,
        user.email
    );

    return {
        success: true,
        sessionId: therapySession.id,
        message: "Session successfully booked! A confirmation email has been sent."
    };
}
