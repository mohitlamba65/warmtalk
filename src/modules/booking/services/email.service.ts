import type { SessionStatus } from "@/generated/prisma/client";

type SessionConfirmationDetails = {
    startTime: Date;
    status: SessionStatus;
};

export const emailService = {
    async sendSessionConfirmation(email: string, sessionDetails: SessionConfirmationDetails) {
        // In a real application, this would integrate with Resend, SendGrid, etc.
        console.log(`\n\n[EMAIL MOCK] 📧 Sending session confirmation email to: ${email}`);
        console.log(`[EMAIL MOCK]    - Session Start: ${sessionDetails.startTime}`);
        console.log(`[EMAIL MOCK]    - Session Status: ${sessionDetails.status}\n\n`);
        
        return true;
    }
};

export type EmailService = typeof emailService;
