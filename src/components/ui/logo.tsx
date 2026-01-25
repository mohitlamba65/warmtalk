import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-br-2xl rounded-tl-2xl bg-accent text-accent-foreground shadow-lg shadow-orange-500/10">
                {/* stylized flame icon roughly matching the vibe */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705 4.347 7.046 7.046 0 00-.415 6.273.75.75 0 00.995.427 8.956 8.956 0 004.856-2.583 6.643 6.643 0 001.967-3.666 9.873 9.873 0 01.378-4.27 5.093 5.093 0 011.897 4.957.75.75 0 00.994.814 8.23 8.23 0 003.587-2.909 6.845 6.845 0 001.127-3.9 8.98 8.98 0 00-3.155-6.684.75.75 0 00-1.002.09c-.58.586-.505 1.583-.008 2.247a3.528 3.528 0 011.135 2.502c0 .927-.333 1.777-.887 2.441a3.504 3.504 0 01-5.163-3.08ZM9.049 13.926a5.05 5.05 0 011.107-1.127.75.75 0 00-.462-1.393 6.55 6.55 0 00-1.637 1.53c-.34.46-.62.966-.83 1.503a.75.75 0 001.275.526 3.56 3.56 0 01.547-1.04Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <span className="font-heading text-2xl font-bold text-slate-700 tracking-tight">WarmTalk.org</span>
        </div>
    );
}
