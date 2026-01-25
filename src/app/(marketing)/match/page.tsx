import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MatchPage() {
    return (
        <div className="min-h-screen bg-soft-bg pt-20 pb-12 px-6 flex flex-col items-center">
            <div className="max-w-2xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-green mb-4 text-center">
                    Let's find your match.
                </h1>
                <p className="text-center text-muted-foreground mb-10">
                    Answer 3 quick questions to help us connect you with the right therapist.
                </p>

                <form action="/therapists" className="space-y-8">
                    {/* Question 1 */}
                    <div className="space-y-4">
                        <Label className="text-lg font-semibold text-brand-green">1. What brings you here today?</Label>
                        <RadioGroup defaultValue="anxiety" name="concern" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="anxiety" id="anxiety" />
                                <Label htmlFor="anxiety" className="cursor-pointer flex-1">Anxiety & Stress</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="depression" id="depression" />
                                <Label htmlFor="depression" className="cursor-pointer flex-1">Depression & Mood</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="relationship" id="relationship" />
                                <Label htmlFor="relationship" className="cursor-pointer flex-1">Relationships</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="work" id="work" />
                                <Label htmlFor="work" className="cursor-pointer flex-1">Work & Burnout</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 2 */}
                    <div className="space-y-4">
                        <Label className="text-lg font-semibold text-brand-green">2. Do you have a gender preference?</Label>
                        <RadioGroup defaultValue="none" name="gender" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female" className="cursor-pointer flex-1">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male" className="cursor-pointer flex-1">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="none" id="none" />
                                <Label htmlFor="none" className="cursor-pointer flex-1">No Preference</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Question 3 */}
                    <div className="space-y-4">
                        <Label className="text-lg font-semibold text-brand-green">3. How do you prefer to communicate?</Label>
                        <RadioGroup defaultValue="video" name="type" className="grid grid-cols-1 gap-4">
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="video" id="video" />
                                <Label htmlFor="video" className="cursor-pointer flex-1">Video Call (Recommended)</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-xl p-4 hover:border-brand-orange hover:bg-orange-50 transition-all cursor-pointer">
                                <RadioGroupItem value="chat" id="chat" />
                                <Label htmlFor="chat" className="cursor-pointer flex-1">Live Chat / Messaging</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold h-14 text-lg rounded-full shadow-lg mt-8">
                        View My Matches
                    </Button>
                </form>
            </div>
        </div>
    );
}
