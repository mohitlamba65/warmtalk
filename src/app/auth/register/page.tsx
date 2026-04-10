"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, User, Mail, Lock, CheckCircle2, Zap, Sun, Shield, Brain, Heart, Sparkles, Users } from "lucide-react";
import { useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { saveClientProfile, saveTherapistProfile } from "@/app/actions/profiles";
import type { DisorderType } from "@/generated/prisma/client";

// --- Form Components & Definitions ---

function ProgressPill({ active, completed, label }: { active: boolean; completed: boolean; label: string }) {
    if (completed) {
        return (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange shrink-0">
                <CheckCircle2 className="w-5 h-5" />
            </div>
        );
    }
    return (
        <div
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-colors shrink-0 ${
                active ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20" : "bg-gray-100 text-gray-400"
            }`}
        >
            {label}
        </div>
    );
}

function ProgressDivider({ active }: { active: boolean }) {
    return <div className={`h-[2px] w-full mx-2 sm:mx-4 transition-colors ${active ? "bg-brand-orange/30" : "bg-gray-100"}`} />;
}

// --- Main Multi-Step Form ---

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Recover ongoing state from URL (if recovering from Google OAuth callback)
    const initialStep = Number(searchParams.get("step")) || 1;
    const initialRole = (searchParams.get("role") as "CLIENT" | "THERAPIST") || "CLIENT";

    // Steps: 1 = Account, 2 = Role/First Q, 3 = Final Qs
    const [step, setStep] = useState(initialStep);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGooglePending, setIsGooglePending] = useState(false);

    // Step 1 State
    const [role, setRole] = useState<"CLIENT" | "THERAPIST">(initialRole);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Step 2 & 3 State (Client)
    const [clientConcern, setClientConcern] = useState<DisorderType | "">("");
    const [clientSeverity, setClientSeverity] = useState<number>(5);
    const [clientStyle, setClientStyle] = useState("");

    // Step 2 & 3 State (Therapist)
    const [therapistSpecialty, setTherapistSpecialty] = useState<DisorderType | "">("");
    const [therapistExperience, setTherapistExperience] = useState<number>(0);
    const [therapistStyle, setTherapistStyle] = useState("");

    const handleAccountCreation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) return toast.error("Please fill all fields.");
        if (password.length < 6) return toast.error("Password too short.");

        setIsSubmitting(true);
        try {
            // Role relies on upper-case UserRole Prisma Enums
            const signUpPayload: any = { name, email, password, role };

            const { error } = await authClient.signUp.email(signUpPayload);
            if (error) { toast.error(error.message); return; }

            // Proceed to Onboarding Questions flawlessly within the same UI
            setStep(2);
        } catch {
            toast.error("Sign up failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOnboardingCompletion = async () => {
        setIsSubmitting(true);
        try {
            if (role === "CLIENT") {
                if (!clientConcern || !clientStyle) return toast.error("Please select all preferences");
                await saveClientProfile({
                    primaryDisorder: clientConcern as DisorderType,
                    severityScore: clientSeverity,
                    stylePreference: clientStyle
                });
                
                // Construct algorithmic matching url to carry state directly without db overhead on edge
                const params = new URLSearchParams({
                    concern: clientConcern,
                    severity: clientSeverity.toString(),
                    style: clientStyle,
                });
                router.push(`/therapists?${params.toString()}`);

            } else {
                if (!therapistSpecialty || therapistExperience <= 0 || !therapistStyle) return toast.error("Please complete your profile details");
                await saveTherapistProfile({
                    primarySpecialty: therapistSpecialty as DisorderType,
                    yearsExperience: therapistExperience,
                    style: therapistStyle
                });
                
                toast.success("Profile fully created!");
                router.push("/therapist/dashboard");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to save profile choices.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignUp = () => {
        setIsGooglePending(true);
        void (async () => {
            try {
                // If user auths through Google, direct them back to Step 2 with their chosen Role
                const nextUrl = `/auth/register?step=2&role=${role}`;
                await authClient.signIn.social({
                    provider: "google",
                    callbackURL: nextUrl,
                });
            } catch (error) {
                toast.error("Failed to initialize Google Sign In.");
            } finally {
                setIsGooglePending(false);
            }
        })();
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden bg-[#FAFCFB]">
            {/* Soft background aesthetic glow matching image */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-lg z-10">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <div className="relative w-48 h-12">
                            <Image src="/logo.svg" alt="WarmTalk" fill className="object-contain" priority />
                        </div>
                    </Link>
                </div>

                <Card className="w-full p-8 sm:p-10 bg-white/80 backdrop-blur-xl border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] transition-all">
                    
                    {/* Multi-Step Header Indicator */}
                    <div className="flex items-center justify-between w-full max-w-sm mx-auto mb-10 overflow-x-auto no-scrollbar">
                        <ProgressPill active={step === 1} completed={step > 1} label="Account" />
                        <ProgressDivider active={step > 1} />
                        <ProgressPill active={step === 2} completed={step > 2} label="About you" />
                        <ProgressDivider active={step > 2} />
                        <ProgressPill active={step === 3} completed={step > 3} label={role === "CLIENT" ? "Matching" : "Expertise"} />
                    </div>

                    {/* Step 1: Account Setup */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-6">
                                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-green">Let's get started</h1>
                            </div>

                            <form onSubmit={handleAccountCreation} className="space-y-5">
                                {/* Role Selection styling adapted to the visual */}
                                <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setRole("CLIENT")}
                                        className={`py-3 rounded-[14px] text-sm font-bold transition-all ${role === "CLIENT" ? "bg-white text-brand-green shadow-sm border border-gray-100" : "text-gray-400 hover:text-gray-600"}`}
                                    >
                                        I am a Client
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole("THERAPIST")}
                                        className={`py-3 rounded-[14px] text-sm font-bold transition-all ${role === "THERAPIST" ? "bg-white text-brand-green shadow-sm border border-gray-100" : "text-gray-400 hover:text-gray-600"}`}
                                    >
                                        I am a Therapist
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your full name"
                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/40 transition-all font-medium text-brand-green placeholder:text-gray-400"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email address"
                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/40 transition-all font-medium text-brand-green placeholder:text-gray-400"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <div className="relative group mb-2">
                                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                                            <input
                                                type="password"
                                                required
                                                placeholder="Choose a password"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/40 transition-all font-medium text-brand-green placeholder:text-gray-400"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 ml-2">Your password must be at least 8 characters long</p>
                                    </div>
                                </div>

                                <div className="pt-4 space-y-3">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input type="checkbox" required className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded text-brand-orange checked:bg-brand-orange checked:border-brand-orange focus:ring-brand-orange focus:ring-offset-0 transition-colors cursor-pointer" />
                                            <CheckCircle2 className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                        </div>
                                        <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors leading-relaxed">
                                            By signing up, you agree to our <span className="font-bold text-brand-green">Terms of Service</span> and <span className="font-bold text-brand-green">Privacy Policy</span>
                                        </span>
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold h-14 rounded-2xl text-lg shadow-[0_4px_14px_rgba(29,60,52,0.2)] transition-all duration-300 hover:scale-[1.02]"
                                >
                                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Continue"}
                                </Button>
                                
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    disabled={isGooglePending}
                                    onClick={handleGoogleSignUp}
                                    variant="outline"
                                    className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold h-14 rounded-2xl text-lg shadow-sm hover:shadow-md border-gray-200 flex items-center justify-center gap-3 transition-all duration-200"
                                >
                                    {isGooglePending ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    )}
                                    {isGooglePending ? "Connecting..." : "Continue with Google"}
                                </Button>
                                
                                <div className="mt-6 text-center text-sm relative z-10">
                                    <span className="text-gray-400">Already have an account? </span>
                                    <Link href="/auth/login" className="text-brand-green font-bold hover:underline decoration-brand-orange/30 underline-offset-4">Log in</Link>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 2: About You (First Questionnaire Batch) */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-green mb-2">About You</h1>
                                <p className="text-brand-green/50 text-sm">
                                    {role === "CLIENT" ? "What brings you to WarmTalk today?" : "What is your primary clinical specialty?"}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { id: "anxiety", label: "Anxiety & Stress", val: "ANXIETY_DISORDERS", icon: <Zap className="w-5 h-5"/> },
                                    { id: "mood", label: "Depression & Mood", val: "MOOD_DISORDERS", icon: <Sun className="w-5 h-5"/> },
                                    { id: "trauma", label: "Trauma & PTSD", val: "TRAUMA_AND_STRESSOR", icon: <Shield className="w-5 h-5"/> },
                                    { id: "neuro", label: "ADHD & Neurodivergence", val: "NEURODEVELOPMENTAL", icon: <Brain className="w-5 h-5"/> },
                                ].map((opt) => {
                                    const activeVal = role === "CLIENT" ? clientConcern : therapistSpecialty;
                                    const isSelected = activeVal === opt.val;
                                    return (
                                        <button
                                            key={opt.id}
                                            onClick={() => role === "CLIENT" ? setClientConcern(opt.val as DisorderType) : setTherapistSpecialty(opt.val as DisorderType)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                                isSelected ? "border-brand-green bg-brand-green/5" : "border-gray-100 bg-gray-50/50 hover:border-brand-green/50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-xl transition-colors ${isSelected ? "bg-brand-green text-white" : "bg-white text-gray-400"}`}>
                                                    {opt.icon}
                                                </div>
                                                <span className={`font-semibold ${isSelected ? "text-brand-green" : "text-gray-600"}`}>{opt.label}</span>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-brand-green bg-brand-green" : "border-gray-300"}`}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-brand-green" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <Button
                                onClick={() => setStep(3)}
                                disabled={(role === "CLIENT" && !clientConcern) || (role === "THERAPIST" && !therapistSpecialty)}
                                className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold h-14 rounded-2xl text-lg shadow-[0_4px_14px_rgba(29,60,52,0.2)] mt-8 disabled:opacity-50 disabled:shadow-none transition-all duration-300 hover:scale-[1.02]"
                            >
                                Next Step
                            </Button>
                        </div>
                    )}

                    {/* Step 3: Final Detail Matrix */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-green mb-2">{role === "CLIENT" ? "Matching Details" : "Clinical Expertise"}</h1>
                                <p className="text-brand-green/50 text-sm">Help us refine the experience.</p>
                            </div>

                            {/* Question Set 2: Multi Variant */}
                            {role === "CLIENT" ? (
                                <div className="space-y-6">
                                    {/* Question 2a */}
                                    <div>
                                        <p className="text-sm font-bold text-brand-green mb-3">How much is this affecting your daily life?</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { label: "Coping", val: 3 },
                                                { label: "Difficult", val: 6 },
                                                { label: "Struggling", val: 9 }
                                            ].map(opt => (
                                                <button
                                                    key={opt.val}
                                                    onClick={() => setClientSeverity(opt.val)}
                                                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border-2 ${
                                                        clientSeverity === opt.val ? "border-brand-orange bg-brand-orange text-white" : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                                    }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Question 2b */}
                                    <div>
                                        <p className="text-sm font-bold text-brand-green mb-3">Therapy style preference?</p>
                                        <div className="space-y-2">
                                            {[
                                                { label: "A gentle listener", val: "listening", icon: <Heart className="w-4 h-4"/> },
                                                { label: "Action-oriented coach", val: "tools", icon: <Sparkles className="w-4 h-4"/> },
                                                { label: "Balanced approach", val: "balanced", icon: <Users className="w-4 h-4"/> }
                                            ].map(opt => (
                                                <button
                                                    key={opt.val}
                                                    onClick={() => setClientStyle(opt.val)}
                                                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${
                                                        clientStyle === opt.val ? "border-brand-orange bg-orange-50/50" : "border-gray-100 bg-gray-50 hover:border-gray-200"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={clientStyle === opt.val ? "text-brand-orange" : "text-gray-400"}>{opt.icon}</div>
                                                        <span className={`font-semibold text-sm ${clientStyle === opt.val ? "text-brand-orange" : "text-gray-500"}`}>{opt.label}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Therapist Question 2a */}
                                    <div>
                                        <p className="text-sm font-bold text-brand-green mb-3">Years of active practice?</p>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full px-4 py-3.5 bg-gray-50/80 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 font-medium text-brand-green"
                                            onChange={(e) => setTherapistExperience(parseInt(e.target.value))}
                                            placeholder="e.g. 5"
                                        />
                                    </div>
                                    {/* Therapist Question 2b */}
                                    <div>
                                        <p className="text-sm font-bold text-brand-green mb-3">Your primary modality style?</p>
                                        <div className="space-y-2">
                                            {[
                                                { label: "Listening & Processing", val: "listening", icon: <Heart className="w-4 h-4"/> },
                                                { label: "Action-oriented Tools", val: "tools", icon: <Sparkles className="w-4 h-4"/> },
                                                { label: "Balanced & Integrative", val: "balanced", icon: <Users className="w-4 h-4"/> }
                                            ].map(opt => (
                                                <button
                                                    key={opt.val}
                                                    onClick={() => setTherapistStyle(opt.val)}
                                                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${
                                                        therapistStyle === opt.val ? "border-brand-green bg-brand-green/5" : "border-gray-100 bg-gray-50 hover:border-gray-200"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={therapistStyle === opt.val ? "text-brand-green" : "text-gray-400"}>{opt.icon}</div>
                                                        <span className={`font-semibold text-sm ${therapistStyle === opt.val ? "text-brand-green" : "text-gray-500"}`}>{opt.label}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleOnboardingCompletion}
                                disabled={isSubmitting}
                                className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold h-14 rounded-2xl text-lg shadow-[0_4px_14px_rgba(29,60,52,0.2)] mt-8 transition-all duration-300 hover:scale-[1.02]"
                            >
                                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (role === "CLIENT" ? "Match me with a Therapist" : "Complete Instructor Profile")}
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#FAFCFB] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-green" /></div>}>
            <RegisterForm />
        </Suspense>
    );
}

