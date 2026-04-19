"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isGooglePending, setIsGooglePending] = useState(false);
    const router = useRouter();

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter your email and password.");
            return;
        }

        setIsSigningIn(true);
        try {
            const { error, data } = await authClient.signIn.email({
                email,
                password,
                rememberMe: true,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Signed in successfully.");
            
            // Redirect based on role if possible, else default dashboard
            const role =
                typeof data?.user === "object" && data.user !== null && "role" in data.user
                    ? (data.user as { role?: string }).role
                    : undefined;

            if (role === "THERAPIST") {
                router.push("/therapist/dashboard");
            } else {
                router.push("/dashboard");
            }
        } catch {
            toast.error("Sign in failed. Please try again.");
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleGoogleSignIn = () => {
        setIsGooglePending(true);
        void (async () => {
            try {
                await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/dashboard",
                });
            } catch (error) {
                toast.error("Failed to initialize Google Sign In. Please try again.");
                console.error(error);
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
                    
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-green mb-2">Welcome Back</h1>
                            <p className="text-brand-green/60 text-sm">Please sign in to your account</p>
                        </div>

                        <form onSubmit={handleEmailSignIn} className="space-y-5">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        placeholder="Email address"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/40 transition-all font-medium text-brand-green placeholder:text-gray-400"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        placeholder="Your password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/40 transition-all font-medium text-brand-green placeholder:text-gray-400"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="pt-1 flex justify-end">
                                    <Link href="/auth/reset-password" className="text-xs font-bold text-brand-orange hover:text-orange-600 hover:underline underline-offset-4 transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSigningIn}
                                className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold h-14 rounded-2xl text-lg shadow-[0_4px_14px_rgba(29,60,52,0.2)] mt-4 transition-all duration-300 hover:scale-[1.02]"
                            >
                                {isSigningIn ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign in"}
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
                                onClick={handleGoogleSignIn}
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
                        </form>
                        
                        <div className="mt-8 text-center text-sm relative z-10">
                            <span className="text-gray-400">Don&apos;t have an account? </span>
                            <Link href="/auth/register" className="text-brand-green font-bold hover:underline decoration-brand-orange/30 underline-offset-4">Sign up</Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

