
"use server";

import { getUserDashboardStats } from "@/modules/dashboard/services/dashboard.service";
import { dashboardRepository } from "@/modules/dashboard/repositories/dashboard.repository";
import { requireSessionUser } from "@/modules/auth/services/session.service";

export async function getDashboardDataAction() {
    const user = await requireSessionUser();

    // Inject the concrete repository implementations into the decoupled service layer
    const data = await getUserDashboardStats(user.id, dashboardRepository);
    return data;
}
