"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    Users,
    Calendar,
    Wallet,
    UserCircle,
    LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAVIGATION = [
    { name: 'Dashboard', href: '/provider', icon: LayoutDashboard },
    { name: 'My Patients', href: '/provider/patients', icon: Users },
    { name: 'Schedule', href: '/provider/schedule', icon: Calendar },
    { name: 'Earnings', href: '/provider/earnings', icon: Wallet },
    { name: 'Profile', href: '/provider/profile', icon: UserCircle },
];

export function ProviderSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-40 h-10">
                        <Image
                            src="/logo.svg"
                            alt="WarmTalk"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {NAVIGATION.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                ? "bg-orange-50 text-brand-orange"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-brand-orange" : "text-gray-400"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Profile */}
            <div className="p-4 m-4 mt-auto">
                <div className="bg-soft-bg rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white">
                            <AvatarFallback className="bg-brand-green text-white">EC</AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-brand-green truncate">Dr. Carter</p>
                            <p className="text-xs text-gray-500 truncate">Psychologist</p>
                        </div>
                    </div>
                    <Link href="/auth/login" className="text-gray-400 hover:text-red-500" title="Log Out">
                        <LogOut className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
