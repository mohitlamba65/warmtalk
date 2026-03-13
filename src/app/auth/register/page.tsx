"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signInWithGoogle } from "@/app/actions/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const [isPending, startTransition] = useTransition();

    const handleGoogleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                // NextAuth's signIn will usually redirect away. If we remain, it might be an error.
                await signInWithGoogle();
                // Normally we don't hit this line due to redirect, but just in case:
                toast.success("Redirecting to Google...");
            } catch (error) {
                toast.error("Failed to initialize Google Sign In. Please try again.");
                console.error(error);
            }
        });
    };

    return (
        <div className="min-h-screen bg-soft-bg flex flex-col items-center justify-center p-4">
            <div className="mb-8 relative w-48 h-12">
                <Image src="/logo.svg" alt="WarmTalk" fill className="object-contain" priority />
            </div>

            <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-xl rounded-3xl transition-all">
                <h1 className="text-2xl font-serif font-bold text-brand-green text-center mb-2">Create an Account</h1>
                <p className="text-center text-muted-foreground mb-8">Join WarmTalk and start your journey</p>

                <form onSubmit={handleGoogleSignUp} className="space-y-6">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 rounded-xl text-lg shadow-md flex items-center justify-center gap-3 transition-colors duration-200"
                    >
                        {isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        )}
                        {isPending ? "Connecting..." : "Sign up with Google"}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link href="/auth/login" className="text-brand-green font-bold hover:underline">Log in</Link>
                </div>
            </Card>
        </div>
    );
}
