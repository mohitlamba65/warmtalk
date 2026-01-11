import { MatchesTable, Match } from "@/components/admin/MatchesTable";
import { SectionHeader } from "@/components/shared/SectionHeader";

const MOCK_MATCHES: Match[] = [
    {
        id: "m1",
        clientName: "Alice Walker",
        providerName: "Dr. Sarah Chen",
        status: "approved",
        score: 98,
        lastUpdated: "2023-10-25",
    },
    {
        id: "m2",
        clientName: "Bob Smith",
        providerName: "Marcus Johnson",
        status: "pending",
        score: 85,
        lastUpdated: "2023-10-26",
    },
    {
        id: "m3",
        clientName: "Charlie Davis",
        providerName: "Elena Rodriguez",
        status: "rejected",
        score: 45,
        lastUpdated: "2023-10-24",
    },
    {
        id: "m4",
        clientName: "Diana Prince",
        providerName: "Dr. Sarah Chen",
        status: "pending",
        score: 92,
        lastUpdated: "2023-10-27",
    },
    {
        id: "m5",
        clientName: "Ethan Hunt",
        providerName: "David Kim",
        status: "approved",
        score: 88,
        lastUpdated: "2023-10-23",
    },
];

export default function AdminMatchesPage() {
    return (
        <div className="min-h-screen bg-soft-bg/30 py-12">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Match Administration"
                    subtitle="Manage client-provider connections and override algorithm suggestions."
                    align="left"
                    className="mb-8"
                />

                <MatchesTable data={MOCK_MATCHES} />
            </div>
        </div>
    );
}
