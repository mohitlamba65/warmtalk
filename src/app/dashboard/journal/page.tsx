import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Book, Calendar as CalendarIcon, Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function JournalPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Journal</h1>
                    <p className="text-gray-500">Track your mood and thoughts privately.</p>
                </div>
                <Button className="bg-brand-green text-white hover:bg-green-800 rounded-xl">
                    <Plus className="w-4 h-4 mr-2" /> New Entry
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Left Col: Calendar/Mood */}
                <div className="space-y-6">
                    <Card className="p-6 border-none shadow-sm bg-brand-orange text-white rounded-2xl text-center">
                        <h3 className="font-bold text-lg mb-2">How are you today?</h3>
                        <div className="flex justify-center gap-3 my-4">
                            {['😔', '😐', '🙂', '😄', '🤩'].map(emoji => (
                                <button key={emoji} className="text-2xl hover:scale-125 transition-transform">{emoji}</button>
                            ))}
                        </div>
                        <p className="text-xs text-white/80">Log your mood to see trends over time.</p>
                    </Card>

                    <Card className="p-4 border-none shadow-sm bg-white rounded-2xl">
                        <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
                            <CalendarIcon className="w-4 h-4 text-gray-400" /> October 2023
                        </div>
                        {/* Mini Cal Logic Stub */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                            {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map((d, i) => <span key={i} className="text-gray-400 font-bold py-1">{d}</span>)}
                            {Array.from({ length: 31 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`py-1 rounded-full cursor-pointer hover:bg-gray-100 ${i === 23 ? 'bg-brand-green text-white font-bold' : ''}`}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Col: Entries */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                        <Book className="w-5 h-5 text-gray-400 ml-2" />
                        <Input placeholder="Search your entries..." className="border-none shadow-none focus-visible:ring-0" />
                    </div>

                    <Card className="p-6 border-none shadow-sm bg-white rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">Happy</Badge>
                                <span className="text-xs text-gray-400">Oct 24 • 9:30 AM</span>
                            </div>
                            <Smile className="w-4 h-4 text-brand-green" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Feeling optimistic about therapy</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            Today I had a great session with Dr. Carter. We talked about triggers and coping mechanisms. I feel much more prepared to handle...
                        </p>
                    </Card>

                    <Card className="p-6 border-none shadow-sm bg-white rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-orange-50 text-brand-orange hover:bg-orange-50">Anxious</Badge>
                                <span className="text-xs text-gray-400">Oct 22 • 8:15 PM</span>
                            </div>
                            <div className="text-2xl">😐</div>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Work was stressful today</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            Deadline approaching and I felt overwhelmed. Tried the breathing exercises but it took a while to calm down. Need to bring this up next time.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
