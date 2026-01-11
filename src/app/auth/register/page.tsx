"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("client");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        // Simulate API call
        console.log("Register as", role, values);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 bg-soft-bg/30">
            <Card className="w-full max-w-md rounded-2xl shadow-lg border-none">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-serif font-bold text-brand-green">Create an Account</CardTitle>
                    <CardDescription>
                        Join WarmTalk today as a {role}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="client" className="w-full" onValueChange={setRole}>
                        <TabsList className="grid w-full grid-cols-2 mb-6 h-12 rounded-full bg-soft-bg p-1">
                            <TabsTrigger value="client" className="rounded-full data-[state=active]:bg-brand-green data-[state=active]:text-white transition-all">Client</TabsTrigger>
                            <TabsTrigger value="provider" className="rounded-full data-[state=active]:bg-brand-green data-[state=active]:text-white transition-all">Provider</TabsTrigger>
                        </TabsList>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    {...form.register("name")}
                                    className="rounded-lg h-11"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    {...form.register("email")}
                                    className="rounded-lg h-11"
                                />
                                {form.formState.errors.email && (
                                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    {...form.register("password")}
                                    className="rounded-lg h-11"
                                />
                                {form.formState.errors.password && (
                                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full h-11 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-semibold text-base" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Account
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <Separator />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">Or sign up with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="rounded-full h-10 border-gray-300">
                                Google
                            </Button>
                            <Button variant="outline" className="rounded-full h-10 border-gray-300">
                                Apple
                            </Button>
                        </div>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account? <Link href="/auth/login" className="text-brand-orange hover:underline font-medium">Log in</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
