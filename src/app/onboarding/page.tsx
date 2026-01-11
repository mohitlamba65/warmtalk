"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// Input removed
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


const LOCATIONS = [
    "California", "New York", "Texas", "Florida", "Illinois", "Washington", "Oregon"
];

const REASONS = [
    "Anxiety", "Depression", "Relationship Issues", "Trauma", "Stress", "Grief", "Sleep", "Self-Esteem"
];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [location, setLocation] = useState("");
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

    const totalSteps = 2; // Can be expanded
    const progress = (step / totalSteps) * 100;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Finish onboarding
            router.push("/dashboard");
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const toggleReason = (reason: string) => {
        setSelectedReasons(prev =>
            prev.includes(reason)
                ? prev.filter(r => r !== reason)
                : [...prev, reason]
        );
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl space-y-8">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-slate-500">
                        <span>Step {step} of {totalSteps}</span>
                        <span>{step === 1 ? "Location" : "Your Needs"}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <Card className="border-0 shadow-lg md:p-8">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-3xl md:text-4xl text-primary">
                            {step === 1 ? "Where are you located?" : "What brings you here today?"}
                        </CardTitle>
                        <p className="text-slate-600 mt-2">
                            {step === 1
                                ? "We need this to match you with licensed therapists in your area."
                                : "Select as many as apply. This helps us find the right specialist."}
                        </p>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col gap-4"
                                >
                                    <select
                                        className="flex h-14 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-base ring-offset-background placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    >
                                        <option value="" disabled>Select your state</option>
                                        {LOCATIONS.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-wrap gap-3 justify-center"
                                >
                                    {REASONS.map((reason) => {
                                        const isSelected = selectedReasons.includes(reason);
                                        return (
                                            <button
                                                key={reason}
                                                onClick={() => toggleReason(reason)}
                                                className={cn(
                                                    "px-6 py-3 rounded-full text-base font-medium transition-all duration-200 border-2",
                                                    isSelected
                                                        ? "bg-primary/10 border-primary text-primary hover:bg-primary/20"
                                                        : "bg-white border-slate-200 text-slate-600 hover:border-primary/50"
                                                )}
                                            >
                                                {reason}
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between mt-10">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={step === 1}
                                className={cn(step === 1 && "invisible")}
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button
                                variant="accent"
                                size="lg"
                                onClick={handleNext}
                                disabled={(step === 1 && !location) || (step === 2 && selectedReasons.length === 0)}
                            >
                                {step === totalSteps ? "Find My Therapist" : "Continue"}
                                {step !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
