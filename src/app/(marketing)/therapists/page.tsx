import { TherapistCard } from "@/components/therapists/TherapistCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock Data
const THERAPISTS = [
    {
        id: "1",
        name: "Dr. Sarah Jenkins",
        title: "PsyD, Clinical Psychologist",
        rating: 4.9,
        reviewCount: 124,
        bio: "I help professionals navigate anxiety and burnout to find balance. My approach is warm, direct, and focused on practical tools you can use immediately. I believe therapy should feel like a partnership.",
        tags: ["ANXIETY", "BURNOUT", "CBT"],
        nextAvailable: "Tomorrow, 10:00 AM",
        price: 120,
        imageUrl: "/images/therapist1.jpg", // Placeholder
        languages: ["English", "Spanish"]
    },
    {
        id: "2",
        name: "Michael Chen",
        title: "LCSW, Therapist",
        rating: 5.0,
        reviewCount: 89,
        bio: "Specializing in relationship dynamics and family systems. I create a safe, non-judgmental space where we can explore patterns and create meaningful change. Let's work together to build stronger connections.",
        tags: ["RELATIONSHIPS", "FAMILY", "MEN'S ISSUES"],
        nextAvailable: "Today, 4:00 PM",
        price: 150,
        imageUrl: "/images/therapist2.jpg", // Placeholder
        languages: ["English", "Mandarin"]
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        title: "LMFT, Family Therapist",
        rating: 4.8,
        reviewCount: 56,
        bio: "Focus on life transitions and grief. I offer a compassionate, patient-centered approach to help you move through difficult seasons of life. I integrate mindfulness and somatic practices.",
        tags: ["GRIEF", "LIFE TRANSITIONS", "MINDFULNESS"],
        nextAvailable: "Mon, 9:00 AM",
        price: 110,
        imageUrl: "/images/therapist3.jpg", // Placeholder
        languages: ["English"]
    },
    {
        id: "4",
        name: "Dr. James Wilson",
        title: "PhD, Psychologist",
        rating: 4.7,
        reviewCount: 42,
        bio: "Helping high-performers manage stress and anxiety. I use data-driven techniques combined with compassionate listening to help you achieve your personal and professional goals.",
        tags: ["STRESS", "CAREER", "PERFORMANCE"],
        nextAvailable: "Tue, 2:00 PM",
        price: 140,
        imageUrl: "/images/therapist4.jpg", // Placeholder
        languages: ["English"]
    },
];

export default function TherapistsPage() {
    return (
        <div className="min-h-screen bg-soft-bg pt-12 pb-20">
            <div className="container mx-auto px-6">

                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-serif font-bold text-brand-green mb-4">Find Your Perfect Match</h1>
                    <p className="text-brand-green/70 text-lg max-w-2xl leading-relaxed">
                        We've found <span className="font-bold text-brand-green">12 therapists</span> who match your vibe check preferences.
                        Browse their profiles and book a free 5-minute chat to see who feels like home.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
                        <div className="bg-white p-6 rounded-3xl shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-serif text-xl font-bold text-brand-green">Filters</h3>
                                <button className="text-xs text-brand-orange font-bold uppercase tracking-wider hover:text-orange-600">Reset All</button>
                            </div>

                            <div className="space-y-8">
                                {/* Specialty Filter */}
                                <div>
                                    <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">SPECIALTY</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox id="anxiety" className="data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange w-5 h-5 rounded-md" defaultChecked />
                                            <Label htmlFor="anxiety" className="text-base text-gray-700 font-medium">Anxiety</Label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Checkbox id="relationships" className="w-5 h-5 rounded-md" />
                                            <Label htmlFor="relationships" className="text-base text-gray-700 font-medium">Relationships</Label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Checkbox id="depression" className="w-5 h-5 rounded-md" />
                                            <Label htmlFor="depression" className="text-base text-gray-700 font-medium">Depression</Label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Checkbox id="trauma" className="w-5 h-5 rounded-md" />
                                            <Label htmlFor="trauma" className="text-base text-gray-700 font-medium">Trauma</Label>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-gray-100" />

                                {/* Availability Filter */}
                                <div>
                                    <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">AVAILABILITY</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-5 h-5 rounded-full border-2 border-brand-orange flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 bg-brand-orange rounded-full"></div>
                                            </div>
                                            <Label htmlFor="anytime" className="text-base text-gray-700 font-medium">Anytime</Label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                            <Label htmlFor="evenings" className="text-base text-gray-700 font-medium">Evenings</Label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                            <Label htmlFor="weekends" className="text-base text-gray-700 font-medium">Weekends</Label>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-gray-100" />

                                {/* Insurance Filter */}
                                <div>
                                    <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">INSURANCE</h4>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-brand-green">
                                            <option>Select your provider</option>
                                            <option>BlueCross</option>
                                            <option>Aetna</option>
                                            <option>Cigna</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Active Filters & Sort */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-brand-green text-white hover:bg-brand-green pl-3 pr-2 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                    Anxiety <X className="w-3 h-3 cursor-pointer" />
                                </Badge>
                                <Badge variant="outline" className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 pl-3 pr-2 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                    Remote Video <X className="w-3 h-3 cursor-pointer" />
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <div className="flex items-center gap-1 font-bold text-brand-green cursor-pointer">
                                    Recommended <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
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
