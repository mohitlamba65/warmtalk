
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserDashboardStats } from "@/modules/dashboard/services/dashboard.service";
import { dashboardRepository } from "@/modules/dashboard/repositories/dashboard.repository";

export async function getDashboardDataAction() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    // Inject the concrete repository implementations into the decoupled service layer
    const data = await getUserDashboardStats(session.user.id, dashboardRepository);
    return data;
}
