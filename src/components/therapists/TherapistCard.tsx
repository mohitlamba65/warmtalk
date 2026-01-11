import Link from "next/link";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TherapistCardProps {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    matchScore: number;
    imageUrl?: string;
    verified?: boolean;
}

export function TherapistCard({ id, name, specialty, rating, matchScore, imageUrl, verified }: TherapistCardProps) {
    return (
        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
            <div className="p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
                        <AvatarImage src={imageUrl} alt={name} />
                        <AvatarFallback className="bg-brand-green/10 text-brand-green text-xl font-bold">
                            {name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    {verified && (
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                            <CheckCircle className="h-5 w-5 text-brand-orange fill-white" />
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{specialty}</p>

                <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{rating}</span>
                </div>

                <Badge variant="secondary" className="bg-brand-green/10 text-brand-green mb-6 px-3 py-1">
                    {matchScore}% Match
                </Badge>

                <Button asChild className="w-full rounded-full bg-brand-orange hover:bg-orange-600 font-semibold">
                    <Link href={`/therapists/${id}/book`}>Book 5-min Vibe Check</Link>
                </Button>
            </div>
        </Card>
    );
}
