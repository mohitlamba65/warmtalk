"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "Ayush" && password === "Ayush123") {
            router.push("/dashboard");
        } else if (username === "provider" && password === "provider123") {
            router.push("/provider");
        } else {
            setError("Invalid credentials. Try 'Ayush'/'Ayush123' or 'provider'/'provider123'");
        }
    };

    return (
        <div className="min-h-screen bg-soft-bg flex flex-col items-center justify-center p-4">
            <div className="mb-8 relative w-48 h-12">
                <Image src="/logo.svg" alt="WarmTalk" fill className="object-contain" />
            </div>

            <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm border-white/50 shadow-xl rounded-3xl">
                <h1 className="text-2xl font-serif font-bold text-brand-green text-center mb-2">Welcome Back</h1>
                <p className="text-center text-muted-foreground mb-8">Please sign in to your account</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Ayush"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="rounded-xl border-gray-200 bg-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="text-xs text-brand-orange font-semibold">Forgot Password?</Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Ayush123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-xl border-gray-200 bg-white"
                        />
                    </div>

                    {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}

                    <Button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 rounded-xl text-lg shadow-md">
                        Sign In
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link href="/auth/register" className="text-brand-green font-bold hover:underline">Sign up</Link>
                </div>
            </Card>

            <div className="mt-8 text-center">
                <p className="text-brand-green/60 text-sm font-medium">Demo Credentials:</p>
                <div className="flex flex-col gap-2 mt-2 items-center">
                    <div className="flex gap-4 text-xs text-gray-500 bg-white/50 px-4 py-2 rounded-full border border-white/40">
                        <span>User: <span className="font-mono font-bold">Ayush</span></span>
                        <span>Pass: <span className="font-mono font-bold">Ayush123</span></span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 bg-white/50 px-4 py-2 rounded-full border border-white/40">
                        <span>Provider: <span className="font-mono font-bold">provider</span></span>
                        <span>Pass: <span className="font-mono font-bold">provider123</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
