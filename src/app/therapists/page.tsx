import { TherapistCard } from "@/components/therapists/TherapistCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Mock Data
const THERAPISTS = [
    {
        id: "1",
        name: "Dr. Sarah Chen",
        specialty: "Anxiety & Depression",
        rating: 4.9,
        matchScore: 98,
        verified: true,
    },
    {
        id: "2",
        name: "Marcus Johnson",
        specialty: "Relationship & Family",
        rating: 4.8,
        matchScore: 95,
        verified: true,
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        specialty: "Trauma Informed",
        rating: 5.0,
        matchScore: 92,
        verified: true,
    },
    {
        id: "4",
        name: "David Kim",
        specialty: "Career Counseling",
        rating: 4.7,
        matchScore: 88,
        verified: true,
    },
];

export default function TherapistsPage() {
    return (
        <div className="min-h-screen bg-soft-bg/30 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-serif text-lg font-bold text-brand-green mb-4">Filter By</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold mb-3 text-sm">Specialty</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="anxiety" />
                                            <Label htmlFor="anxiety">Anxiety</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="depression" />
                                            <Label htmlFor="depression">Depression</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="trauma" />
                                            <Label htmlFor="trauma">Trauma</Label>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="font-semibold mb-3 text-sm">Insurance</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="bluecross" />
                                            <Label htmlFor="bluecross">BlueCross</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="aetna" />
                                            <Label htmlFor="aetna">Aetna</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="cigna" />
                                            <Label htmlFor="cigna">Cigna</Label>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="font-semibold mb-3 text-sm">Availability</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="today" />
                                            <Label htmlFor="today">Today</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="weekend" />
                                            <Label htmlFor="weekend">Weekends</Label>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full bg-brand-green hover:bg-green-900 text-white rounded-full">
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-serif font-bold text-brand-green">Matched Therapists</h1>
                            <p className="text-muted-foreground">{THERAPISTS.length} results based on your profile</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {THERAPISTS.map((therapist) => (
                                <TherapistCard key={therapist.id} {...therapist} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
