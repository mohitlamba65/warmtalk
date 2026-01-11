import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Wind } from "lucide-react";

export default function DashboardPage() {
    const MOODS = ["😔", "😕", "😐", "🙂", "✨"];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900">
                    Good morning, Alex.
                </h1>
                <p className="text-slate-600 mt-1">Your safe space is ready.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Next Session Card */}
                <Card className="col-span-1 md:col-span-2 border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Next Session</span>
                            <span className="text-sm font-normal text-slate-500 bg-white px-3 py-1 rounded-full">
                                Starts in 2 hours
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-slate-200"></div>
                            <div>
                                <h4 className="font-semibold text-lg text-slate-900">Dr. Sarah Jenkins</h4>
                                <p className="text-slate-600">Cognitive Behavioral Therapy</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button size="lg" variant="accent" className="flex-1 gap-2">
                                <Video className="h-5 w-5" />
                                Join Video Room
                            </Button>
                            <Button size="lg" variant="outline" className="flex-1 gap-2 bg-white">
                                Reschedule
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start gap-3 h-14 text-base">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Message Therapist
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3 h-14 text-base">
                            <Wind className="h-5 w-5 text-primary" />
                            Breathing Exercise
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Mood Tracker */}
            <Card>
                <CardHeader>
                    <CardTitle>How are you feeling today?</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between gap-4 max-w-md mx-auto py-4">
                        {MOODS.map((emoji, index) => (
                            <button
                                key={index}
                                className="text-4xl hover:scale-125 transition-transform p-4 rounded-2xl hover:bg-slate-50 focus:bg-primary/10 focus:outline-none"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
