"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LucideLogOut } from "lucide-react";
import { toast } from "sonner";

const Logout = () => {
    const router = useRouter();
    
    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully");
            router.push("/auth/login");
            router.refresh(); // Force refresh to clear any cached state
        } catch (error) {
            toast.error("Failed to logout");
            console.error("Logout error:", error);
        }
    };
    
    return (
        <button 
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
        >
            <LucideLogOut className="w-5 h-5" />
        </button>
    );
};

export default Logout;