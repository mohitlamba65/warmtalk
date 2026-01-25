import Link from "next/link";
import { Star, Video, Languages, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TherapistCardProps {
    id: string;
    name: string;
    title: string;
    rating: number;
    reviewCount: number;
    bio: string;
    tags: string[];
    nextAvailable: string;
    price: number;
    imageUrl?: string;
    languages: string[];
}

export function TherapistCard({
    id, name, title, rating, reviewCount, bio, tags, nextAvailable, price, imageUrl, languages
}: TherapistCardProps) {
    return (
        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all bg-white rounded-3xl p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex gap-4 items-start mb-4">
                <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                        <AvatarImage src={imageUrl} alt={name} />
                        <AvatarFallback className="bg-brand-green/10 text-brand-green text-lg font-bold">
                            {name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold text-brand-green leading-tight">{name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{title}</p>
                    <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
                        <span className="font-bold text- brand-green text-sm">{rating}</span>
                        <span className="text-muted-foreground text-xs">({reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {bio}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-brand-green/5 text-brand-green hover:bg-brand-green/10 font-medium text-[10px] uppercase tracking-wider px-2 py-1">
                        {tag}
                    </Badge>
                ))}
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 mt-auto">
                <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Call</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5" />
                    <span>{languages.join(", ")}</span>
                </div>
            </div>

            {/* Footer Action */}
            <div className="border-t border-gray-100 pt-4 mt-auto">
                <div className="flex justify-between items-center text-xs mb-3">
                    <div>
                        <span className="text-gray-400 block uppercase tracking-widest text-[10px] font-bold">NEXT AVAILABLE</span>
                        <span className="font-medium text-brand-green">{nextAvailable}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-gray-400 block uppercase tracking-widest text-[10px] font-bold">SESSION</span>
                        <span className="font-medium text-brand-green">${price} / 50 min</span>
                    </div>
                </div>
                <Button asChild className="w-full rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 shadow-sm text-sm">
                    <Link href={`/therapists/${id}/book`}>
                        <Calendar className="w-4 h-4 mr-2" /> Book Free 5-Min Vibe Check
                    </Link>
                </Button>
            </div>
        </Card>
    );
}
