"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Messages", href: "/dashboard/messages" },
    { name: "Journal", href: "/dashboard/journal" },
    { name: "Billing", href: "/dashboard/billing" },
];

export function DashboardNavbar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/dashboard" && pathname === "/dashboard") return true;
        if (path !== "/dashboard" && pathname?.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="w-full bg-white border-b border-gray-100 py-4 px-6">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-60 h-20">
                        <Image
                            src="/logo.svg"
                            alt="WarmTalk"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`transition-colors ${isActive(item.href)
                                    ? "text-brand-green font-bold"
                                    : "hover:text-brand-green"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-green relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </Button>
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                        <Avatar className="h-9 w-9 bg-brand-orange/10">
                            <AvatarFallback className="text-brand-orange font-bold text-sm">AY</AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block">
                            <p className="text-sm font-bold text-gray-900 leading-none">Ayush</p>
                            <p className="text-xs text-muted-foreground">Premium Plan</p>
                        </div>
                        <Link href="/auth/login" className="ml-4 text-gray-400 hover:text-red-500 transition-colors" title="Log Out">
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
