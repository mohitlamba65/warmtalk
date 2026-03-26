import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function TherapistDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/auth/login");
    }

    if (session.user.role !== "THERAPIST") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#FAFCFB]">
            <DashboardNavbar />
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
