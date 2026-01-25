import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Video } from "lucide-react";

export default function SchedulePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
                    <p className="text-gray-500">Manage your availability and appointments.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-gray-600">Sync Calendar</Button>
                    <Button className="bg-brand-orange text-white hover:bg-orange-600">
                        + Add Blocked Time
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Calendar View Stub */}
                <Card className="lg:col-span-2 border-none shadow-sm bg-white p-6 rounded-2xl min-h-[500px]">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-gray-900">October 2023</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><ChevronLeft className="w-4 h-4" /></Button>
                            <Button variant="ghost" className="font-bold">Today</Button>
                            <Button variant="ghost" size="icon"><ChevronRight className="w-4 h-4" /></Button>
                        </div>
                    </div>

                    {/* Mock Time Grid */}
                    <div className="space-y-4">
                        {[9, 10, 11, 12, 13, 14, 15, 16].map((hour) => (
                            <div key={hour} className="flex gap-4 border-b border-gray-50 pb-4 min-h-[60px]">
                                <span className="text-sm font-medium text-gray-400 w-16 text-right">{hour}:00</span>
                                <div className="flex-1 relative">
                                    {hour === 10 && (
                                        <div className="absolute top-0 left-0 w-full bg-orange-50 border-l-4 border-brand-orange p-2 rounded-r-lg">
                                            <p className="text-xs font-bold text-brand-orange">Sarah Jenkins - Anxiety Intake</p>
                                            <p className="text-[10px] text-orange-600">Video Call • 50m</p>
                                        </div>
                                    )}
                                    {hour === 11 && (
                                        <div className="absolute top-30 left-0 w-full bg-blue-50 border-l-4 border-blue-500 p-2 rounded-r-lg">
                                            <p className="text-xs font-bold text-blue-700">Michael Ross - Follow Up</p>
                                            <p className="text-[10px] text-blue-600">Video Call • 50m</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Availability Settings */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm bg-white p-6 rounded-2xl">
                        <h3 className="font-bold text-gray-900 mb-4">Availability Settings</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Video Sessions</span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Automated</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Instant Match</span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">On</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Daily Limit</span>
                                <span className="text-xs font-bold text-gray-900">5 Sessions</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-none shadow-sm bg-[#1D3C34] p-6 rounded-2xl text-white">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-xl">
                                <Clock className="w-6 h-6 text-brand-orange" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Next Session</h3>
                                <p className="text-sm text-gray-300 mb-4">Starts in 30 minutes</p>
                                <Button className="w-full bg-brand-orange text-white hover:bg-orange-600 border-none">
                                    <Video className="w-4 h-4 mr-2" /> Start Now
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
