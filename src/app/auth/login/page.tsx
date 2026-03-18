"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
            const { error } = await authClient.signIn.email({
                email,
                password,
                rememberMe: true,
                callbackURL: "/dashboard",
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Signed in successfully.");
            router.push("/dashboard");
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
        <div className="min-h-screen bg-soft-bg flex flex-col items-center justify-center p-4">
            <div className="mb-8 relative w-48 h-12">
                <Image src="/logo.svg" alt="WarmTalk" fill className="object-contain" priority />
            </div>

            <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-xl rounded-3xl transition-all">
                <h1 className="text-2xl font-serif font-bold text-brand-green text-center mb-2">Welcome Back</h1>
                <p className="text-center text-muted-foreground mb-8">Please sign in to your account</p>

                <form onSubmit={handleEmailSignIn} className="space-y-6">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        disabled={isSigningIn}
                        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 rounded-xl text-lg shadow-md flex items-center justify-center gap-3 transition-colors duration-200"
                    >
                        {isSigningIn ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : null}
                        {isSigningIn ? "Signing in..." : "Sign in with Email"}
                    </Button>

                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isGooglePending}
                        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 rounded-xl text-lg shadow-md flex items-center justify-center gap-3 transition-colors duration-200"
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
                        {isGooglePending ? "Connecting..." : "Sign in with Google"}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-muted-foreground">Do not have an account? </span>
                    <Link href="/auth/register" className="text-brand-green font-bold hover:underline">Sign up</Link>
                </div>
            </Card>
        </div>
    );
}
