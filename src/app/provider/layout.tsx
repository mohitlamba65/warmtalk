import { ProviderSidebar } from "@/components/provider/ProviderSidebar";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FFFDF9] flex">
            {/* Sidebar */}
            <ProviderSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="h-20 border-b border-gray-100 bg-white/50 backdrop-blur-sm px-8 flex items-center justify-between sticky top-0 z-10">
                    {/* Search */}
                    <div className="w-96 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search patients, notes, or resources..."
                            className="pl-10 bg-gray-50 border-transparent focus:bg-white focus:border-brand-orange/20 transition-all rounded-full"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-green-700">Online for Matches</span>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-green relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </Button>
                    </div>
                </header>

                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
