"use client";

import { Home, Calendar, MessageCircle, CreditCard, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const NAV_ITEMS = [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "Find a New Match", href: "/dashboard/match", icon: UserPlus },
    { label: "My Sessions", href: "/dashboard/sessions", icon: Calendar },
    { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { label: "Messages", href: "/dashboard/messages", icon: MessageCircle },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen p-4 md:p-6 gap-6">
            {/* Floating Sidebar */}
            <aside className="w-72 bg-white/95 backdrop-blur-md rounded-[2rem] shadow-xl hidden md:flex flex-col p-6 h-[calc(100vh-3rem)] sticky top-6">
                <div className="mb-10 px-2">
                    <Logo />
                </div>

                <nav className="flex-1 space-y-3">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200",
                                    isActive
                                        ? "bg-slate-50 text-slate-900 shadow-sm translate-x-1"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
                                )}
                            >
                                <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto border-t border-slate-100 pt-6">
                    <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area - Transparent or contained depending on page */}
            <main className="flex-1 overflow-y-auto rounded-[2rem]">
                {children}
            </main>
        </div>
    );
}
