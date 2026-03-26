import { TherapistCard } from "@/components/therapists/TherapistCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

// --- Concern label map ---
const CONCERN_LABELS: Record<string, string> = {
    ANXIETY_DISORDERS: "Anxiety & Stress",
    MOOD_DISORDERS: "Depression & Mood",
    TRAUMA_AND_STRESSOR: "Trauma & PTSD",
    NEURODEVELOPMENTAL: "ADHD & Neurodivergence",
    GENERAL: "General Support",
};

const SEVERITY_LABELS: Record<string, string> = {
    "3": "Coping Well",
    "6": "Getting Difficult",
    "9": "Really Struggling",
};

const STYLE_LABELS: Record<string, string> = {
    listening: "Gentle Listener",
    tools: "Action-Oriented",
    balanced: "Balanced Approach",
};

// --- Dummy Therapist Data with Scoring ---
interface DummyTherapist {
    id: string;
    name: string;
    title: string;
    rating: number;
    reviewCount: number;
    bio: string;
    tags: string[];
    nextAvailable: string;
    price: number;
    imageUrl?: string;
    languages: string[];
    specialties: string[];
    yearsExperience: number;
    bioKeywords: string[];
}

const ALL_THERAPISTS: DummyTherapist[] = [
    {
        id: "1",
        name: "Dr. Sarah Jenkins",
        title: "PsyD, Clinical Psychologist",
        rating: 4.9,
        reviewCount: 124,
        bio: "I help professionals navigate anxiety and burnout to find balance. My approach is warm, direct, and focused on practical tools you can use immediately.",
        tags: ["ANXIETY", "BURNOUT", "CBT"],
        nextAvailable: "Tomorrow, 10:00 AM",
        price: 120,
        languages: ["English", "Spanish"],
        specialties: ["ANXIETY_DISORDERS", "MOOD_DISORDERS"],
        yearsExperience: 12,
        bioKeywords: ["action-oriented", "tools"],
    },
    {
        id: "2",
        name: "Michael Chen",
        title: "LCSW, Therapist",
        rating: 5.0,
        reviewCount: 89,
        bio: "Specializing in trauma recovery and relationship dynamics. I create a safe, non-judgmental space where we can explore patterns and create meaningful change.",
        tags: ["TRAUMA", "RELATIONSHIPS", "EMDR"],
        nextAvailable: "Today, 4:00 PM",
        price: 150,
        languages: ["English", "Mandarin"],
        specialties: ["TRAUMA_AND_STRESSOR", "MOOD_DISORDERS"],
        yearsExperience: 8,
        bioKeywords: ["listening", "safe space"],
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        title: "LMFT, Family Therapist",
        rating: 4.8,
        reviewCount: 56,
        bio: "Focus on life transitions, grief, and mindfulness. I offer a compassionate, patient-centered approach integrating somatic practices and gentle guidance.",
        tags: ["GRIEF", "LIFE TRANSITIONS", "MINDFULNESS"],
        nextAvailable: "Mon, 9:00 AM",
        price: 110,
        languages: ["English"],
        specialties: ["MOOD_DISORDERS", "GENERAL"],
        yearsExperience: 6,
        bioKeywords: ["listening", "gentle"],
    },
    {
        id: "4",
        name: "Dr. James Wilson",
        title: "PhD, Psychologist",
        rating: 4.7,
        reviewCount: 42,
        bio: "Helping high-performers manage stress and anxiety with data-driven, action-oriented techniques. I combine CBT with performance coaching for lasting results.",
        tags: ["STRESS", "PERFORMANCE", "CBT"],
        nextAvailable: "Tue, 2:00 PM",
        price: 140,
        languages: ["English"],
        specialties: ["ANXIETY_DISORDERS", "NEURODEVELOPMENTAL"],
        yearsExperience: 15,
        bioKeywords: ["action-oriented", "tools", "coaching"],
    },
    {
        id: "5",
        name: "Dr. Priya Sharma",
        title: "PsyD, Neuropsychologist",
        rating: 4.9,
        reviewCount: 73,
        bio: "Specializing in ADHD, neurodivergence, and executive function coaching. I use evidence-based tools to help you thrive with how your brain works, not against it.",
        tags: ["ADHD", "NEURODIVERGENCE", "COACHING"],
        nextAvailable: "Wed, 11:00 AM",
        price: 160,
        languages: ["English", "Hindi"],
        specialties: ["NEURODEVELOPMENTAL", "ANXIETY_DISORDERS"],
        yearsExperience: 10,
        bioKeywords: ["action-oriented", "tools", "coaching"],
    },
    {
        id: "6",
        name: "Amanda Foster",
        title: "LPC, Trauma Specialist",
        rating: 4.8,
        reviewCount: 95,
        bio: "Trauma-informed care with EMDR and somatic experiencing. I provide a gentle, safe environment for processing difficult experiences at your own pace.",
        tags: ["TRAUMA", "PTSD", "EMDR"],
        nextAvailable: "Thu, 3:00 PM",
        price: 130,
        languages: ["English"],
        specialties: ["TRAUMA_AND_STRESSOR"],
        yearsExperience: 9,
        bioKeywords: ["listening", "gentle", "safe"],
    },
];

// --- Scoring Function ---
function scoreTherapists(
    therapists: DummyTherapist[],
    concern: string,
    severity: string,
    style: string
): (DummyTherapist & { matchScore: number })[] {
    return therapists
        .map((t) => {
            let score = 0;

            // A. Specialty match (50 pts)
            if (concern && t.specialties.includes(concern)) {
                score += 50;
            }

            // B. Experience match (up to 30 pts)
            const sevNum = parseInt(severity) || 5;
            if (sevNum >= 7) {
                if (t.yearsExperience >= 10) score += 30;
                else if (t.yearsExperience >= 5) score += 20;
                else score += 10;
            } else {
                if (t.yearsExperience >= 5) score += 15;
                else score += 10;
            }

            // C. Style match (up to 15 pts)
            if (style && t.bioKeywords.includes(style)) {
                score += 15;
            }

            // D. Rating bonus (up to 5 pts)
            score += Math.round(t.rating);

            return { ...t, matchScore: score };
        })
        .sort((a, b) => b.matchScore - a.matchScore);
}

// --- Page Component ---
export default async function TherapistsPage({
    searchParams,
}: {
    searchParams: Promise<{ concern?: string; severity?: string; style?: string }>;
}) {
    const params = await searchParams;
    const concern = params.concern || "";
    const severity = params.severity || "5";
    const style = params.style || "";

    const hasFilters = !!concern;
    const scoredTherapists = scoreTherapists(ALL_THERAPISTS, concern, severity, style);

    // Take top 5
    const topMatches = scoredTherapists.slice(0, 5);
    const bestScore = topMatches[0]?.matchScore || 1;

    return (
        <div className="min-h-screen bg-soft-bg pt-8 pb-20">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Hero Header */}
                <div className="mb-10 mt-12">
                    {hasFilters && (
                        <Link
                            href="/match"
                            className="inline-flex items-center gap-2 text-sm text-brand-green/50 hover:text-brand-green mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Retake questionnaire
                        </Link>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-brand-orange" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-green">
                            {hasFilters ? "Your Top Matches" : "Browse Therapists"}
                        </h1>
                    </div>
                    <p className="text-brand-green/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                        {hasFilters
                            ? `We found ${topMatches.length} therapists tailored to your needs. Each match score is based on specialty fit, experience level, and therapy style.`
                            : "Browse our verified therapists. Take the matching quiz to get personalized recommendations."}
                    </p>

                    {/* Active Filters */}
                    {hasFilters && (
                        <div className="flex flex-wrap gap-2 mt-5">
                            {concern && CONCERN_LABELS[concern] && (
                                <Badge className="bg-brand-green text-white hover:bg-brand-green rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
                                    {CONCERN_LABELS[concern]}
                                </Badge>
                            )}
                            {severity && SEVERITY_LABELS[severity] && (
                                <Badge
                                    variant="outline"
                                    className="bg-white border-brand-green/20 text-brand-green rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                                >
                                    Impact: {SEVERITY_LABELS[severity]}
                                </Badge>
                            )}
                            {style && STYLE_LABELS[style] && (
                                <Badge
                                    variant="outline"
                                    className="bg-white border-brand-orange/30 text-brand-orange rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                                >
                                    Style: {STYLE_LABELS[style]}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {topMatches.map((therapist, index) => {
                        const matchPercent = Math.round((therapist.matchScore / bestScore) * 100);
                        return (
                            <div key={therapist.id} className="relative group">
                                {/* Match Score Badge */}
                                {hasFilters && (
                                    <div className="absolute -top-4 -right-4 z-20">
                                        <div
                                            className={`w-16 h-16 rounded-[1.25rem] flex flex-col items-center justify-center text-white font-bold shadow-xl border-2 border-white transform hover:scale-105 transition-transform ${index === 0
                                                    ? "bg-gradient-to-br from-brand-orange to-orange-500 shadow-brand-orange/40"
                                                    : "bg-gradient-to-br from-brand-green to-emerald-700 shadow-brand-green/30"
                                                }`}
                                        >
                                            <span className="text-sm leading-none">{matchPercent}%</span>
                                            <span className="text-[9px] opacity-75 mt-0.5">match</span>
                                        </div>
                                    </div>
                                )}
                                <TherapistCard {...therapist} />
                            </div>
                        );
                    })}
                </div>

                {/* CTA if no filters */}
                {!hasFilters && (
                    <div className="text-center mt-16 bg-white/80 backdrop-blur-md border border-white/60 rounded-[2rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-lg mx-auto relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10 w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-5 shadow-inner">
                            <Sparkles className="w-8 h-8 text-brand-orange" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-brand-green mb-3">
                            Not sure where to start?
                        </h2>
                        <p className="text-brand-green/60 mb-6 max-w-sm mx-auto">
                            Take our 1-minute matching quiz and we&apos;ll recommend the best therapists for your unique needs.
                        </p>
                        <Button
                            asChild
                            className="bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-full h-12 px-8 shadow-lg shadow-brand-orange/20"
                        >
                            <Link href="/match">Take the Quiz</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
