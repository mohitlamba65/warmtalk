import type { BookingRepository } from "../repositories/booking.repository";
import type { EmailService } from "./email.service";

export const bookingService = {
    async getTherapistAvailability(therapistId: string, targetDate: Date, repo: BookingRepository) {
        // Fetch existing sessions to detect conflicts
        const existingSessions = await repo.getSessionsForDate(therapistId, targetDate);
        
        const availableSlots = [];
        // Standard working hours calculation (e.g., 9 AM to 5 PM)
        const startHour = 9;
        const endHour = 17;

        for (let hour = startHour; hour < endHour; hour++) {
            const slotStart = new Date(targetDate);
            slotStart.setHours(hour, 0, 0, 0);
            
            const slotEnd = new Date(targetDate);
            slotEnd.setHours(hour, 50, 0, 0); // 50 minute standard session rule
            
            // Overlap check
            const hasConflict = existingSessions.some(session => {
                const sessionStart = new Date(session.startTime);
                const sessionEnd = new Date(session.endTime);
                return (slotStart < sessionEnd && slotEnd > sessionStart);
            });

            // Ensure slot isn't in the past
            if (!hasConflict && slotStart > new Date()) {
                availableSlots.push(slotStart);
            }
        }
        
        return availableSlots;
    },

    async bookSession(
        clientId: string, 
        therapistId: string, 
        slotStart: Date, 
        repo: BookingRepository, 
        emailer: EmailService, 
        clientEmail: string
    ) {
        // 1. Calculate duration mapping (50 minutes)
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotStart.getMinutes() + 50);

        // 2. Double-check conflict exactly at time of insertion to prevent race conditions
        const hasConflict = await repo.checkConflict(therapistId, slotStart, slotEnd);
        if (hasConflict) {
            throw new Error("This slot is no longer available. Please select another time.");
        }

        // 3. Persist the session
        const session = await repo.createSession(clientId, therapistId, slotStart, slotEnd);
        
        // 4. Dispatch Email logic
        await emailer.sendSessionConfirmation(clientEmail, session);

        return session;
    }
};
