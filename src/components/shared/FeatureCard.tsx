import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
    return (
        <Card className={`rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white ${className}`}>
            <CardHeader className="flex flex-col items-center pb-2">
                <div className="p-3 rounded-full bg-soft-bg mb-4">
                    <Icon className="h-8 w-8 text-brand-orange" />
                </div>
                <CardTitle className="text-xl font-bold text-center text-brand-green">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}
