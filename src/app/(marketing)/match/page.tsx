"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles, Heart, Brain, Shield, Zap, Sun, Users } from "lucide-react";

// --- Data Definitions ---

interface Option {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    value: string;
}

interface Step {
    id: number;
    title: string;
    subtitle: string;
    options: Option[];
}

const STEPS: Step[] = [
    {
        id: 1,
        title: "What brings you to WarmTalk today?",
        subtitle: "Understanding your needs helps us find the best therapist for you.",
        options: [
            {
                id: "anxiety",
                label: "Anxiety & Stress",
                description: "Feeling worried, overwhelmed, or panicked",
                icon: <Zap className="w-6 h-6" />,
                value: "ANXIETY_DISORDERS",
            },
            {
                id: "mood",
                label: "Depression & Mood",
                description: "Persistent sadness, low energy, or hopelessness",
                icon: <Sun className="w-6 h-6" />,
                value: "MOOD_DISORDERS",
            },
            {
                id: "trauma",
                label: "Trauma & PTSD",
                description: "Processing a difficult or traumatic experience",
                icon: <Shield className="w-6 h-6" />,
                value: "TRAUMA_AND_STRESSOR",
            },
            {
                id: "neuro",
                label: "ADHD & Neurodivergence",
                description: "Navigating focus, attention, or neurodevelopmental needs",
                icon: <Brain className="w-6 h-6" />,
                value: "NEURODEVELOPMENTAL",
            },
            {
                id: "general",
                label: "General Support",
                description: "Life transitions, self-growth, or just need to talk",
                icon: <Heart className="w-6 h-6" />,
                value: "GENERAL",
            },
        ],
    },
    {
        id: 2,
        title: "How much is this affecting your daily life?",
        subtitle: "This helps us match you with the right level of expertise.",
        options: [
            {
                id: "low",
                label: "I'm coping well",
                description: "I'd like some guidance and proactive support",
                icon: <Sun className="w-6 h-6" />,
                value: "3",
            },
            {
                id: "medium",
                label: "It's getting difficult",
                description: "My daily routines and relationships are noticeably affected",
                icon: <Zap className="w-6 h-6" />,
                value: "6",
            },
            {
                id: "high",
                label: "I'm really struggling",
                description: "I feel overwhelmed and need strong professional support",
                icon: <Shield className="w-6 h-6" />,
                value: "9",
            },
        ],
    },
    {
        id: 3,
        title: "What style feels right for you?",
        subtitle: "There's no wrong answer — it's about what makes you feel comfortable.",
        options: [
            {
                id: "listening",
                label: "A gentle listener",
                description: "Someone warm and patient who helps me process at my own pace",
                icon: <Heart className="w-6 h-6" />,
                value: "listening",
            },
            {
                id: "actionable",
                label: "Action-oriented coach",
                description: "Give me tools, exercises, and direct challenges to grow",
                icon: <Sparkles className="w-6 h-6" />,
                value: "tools",
            },
            {
                id: "balanced",
                label: "A balanced approach",
                description: "A mix of listening and actionable strategies",
                icon: <Users className="w-6 h-6" />,
                value: "balanced",
            },
        ],
    },
];

// --- Component ---

export default function MatchPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");

    const step = STEPS[currentStep];
    const progress = ((currentStep + 1) / STEPS.length) * 100;
    const isLastStep = currentStep === STEPS.length - 1;
    const canProceed = answers[currentStep] !== undefined;

    function selectOption(value: string) {
        setAnswers((prev) => ({ ...prev, [currentStep]: value }));
    }

    function goNext() {
        if (!canProceed) return;
        if (isLastStep) {
            // Navigate to results with query params
            const params = new URLSearchParams({
                concern: answers[0] || "",
                severity: answers[1] || "",
                style: answers[2] || "",
            });
            router.push(`/therapists?${params.toString()}`);
            return;
        }
        setDirection("forward");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
            setIsAnimating(false);
        }, 300);
    }

    function goBack() {
        if (currentStep === 0) return;
        setDirection("backward");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentStep((prev) => prev - 1);
            setIsAnimating(false);
        }, 300);
    }

    return (
        <div className="min-h-screen bg-soft-bg pt-8 pb-12 px-4 sm:px-6 flex flex-col items-center">
            {/* Progress Bar */}
            <div className="w-full max-w-xl mb-8 mt-12">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-green/50">
                        Step {currentStep + 1} of {STEPS.length}
                    </span>
                    <span className="text-xs font-bold text-brand-orange">
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className="w-full h-2 bg-brand-green/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-brand-orange to-orange-400 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Card */}
            <div className="w-full max-w-xl">
                <div
                    className={`bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-brand-green/5 transition-all duration-300 ${isAnimating
                            ? direction === "forward"
                                ? "opacity-0 translate-x-8"
                                : "opacity-0 -translate-x-8"
                            : "opacity-100 translate-x-0"
                        }`}
                >
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-green mb-3 leading-tight">
                            {step.title}
                        </h1>
                        <p className="text-sm sm:text-base text-brand-green/60 max-w-md mx-auto leading-relaxed">
                            {step.subtitle}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {step.options.map((option) => {
                            const isSelected = answers[currentStep] === option.value;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => selectOption(option.value)}
                                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer group ${isSelected
                                            ? "border-brand-orange bg-orange-50/80 shadow-md shadow-brand-orange/10"
                                            : "border-gray-100 bg-white hover:border-brand-green/20 hover:bg-brand-green/[0.02]"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div
                                            className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${isSelected
                                                    ? "bg-brand-orange text-white"
                                                    : "bg-brand-green/5 text-brand-green/60 group-hover:bg-brand-green/10"
                                                }`}
                                        >
                                            {option.icon}
                                        </div>
                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`font-semibold text-sm sm:text-base mb-0.5 transition-colors duration-200 ${isSelected ? "text-brand-green" : "text-brand-green/80"
                                                    }`}
                                            >
                                                {option.label}
                                            </p>
                                            <p className="text-xs sm:text-sm text-brand-green/50 leading-relaxed">
                                                {option.description}
                                            </p>
                                        </div>
                                        {/* Radio indicator */}
                                        <div
                                            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center transition-all duration-200 ${isSelected
                                                    ? "border-brand-orange bg-brand-orange"
                                                    : "border-gray-200 group-hover:border-brand-green/30"
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6 px-1">
                    <Button
                        variant="ghost"
                        onClick={goBack}
                        disabled={currentStep === 0}
                        className="text-brand-green/60 hover:text-brand-green hover:bg-brand-green/5 gap-2 rounded-xl h-12 px-5 font-semibold disabled:opacity-0 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Button>

                    <Button
                        onClick={goNext}
                        disabled={!canProceed}
                        className={`gap-2 rounded-full h-12 px-8 font-bold text-white shadow-lg transition-all duration-300 cursor-pointer ${canProceed
                                ? "bg-brand-orange hover:bg-orange-600 shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:scale-[1.02]"
                                : "bg-gray-200 text-gray-400 shadow-none cursor-not-allowed"
                            }`}
                    >
                        {isLastStep ? (
                            <>
                                <Sparkles className="w-4 h-4" /> Find My Match
                            </>
                        ) : (
                            <>
                                Continue <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </div>

                {/* Trust Badge */}
                <p className="text-center text-xs text-brand-green/30 mt-8">
                    Your answers are private and only used for matching. No diagnosis is made.
                </p>
            </div>
        </div>
    );
}
