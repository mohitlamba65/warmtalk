import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
    align?: "left" | "center" | "right";
}

export function SectionHeader({ title, subtitle, className, align = "center" }: SectionHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-3 mb-12",
            align === "center" && "items-center text-center",
            align === "right" && "items-end text-right",
            className
        )}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-green tracking-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-muted-foreground max-w-2xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
