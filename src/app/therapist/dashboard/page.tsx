import {
    Video,
    Clock,
    FileText,
    TrendingUp,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function TherapistDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    if(!session) {
        redirect("/auth/login");
    }
    
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-green tracking-tight">
                    Welcome back, {session.user?.name}!
                </h1>
                <p className="text-brand-green/70 mt-2 text-lg">Here&apos;s your practice overview for today.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Content (2 cols) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Upcoming Session Card */}
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gradient-to-br from-[#F5FBF2] to-white rounded-[2rem] relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                        {/* Decorator */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <CardContent className="p-6 md:p-8 relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                                <div>
                                    <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 mb-4 px-3 py-1 font-bold tracking-wide uppercase text-xs">
                                        Next Client
                                    </Badge>
                                    <h2 className="text-2xl font-serif font-bold text-brand-green mb-2">Session with Mark J.</h2>
                                    <p className="text-brand-green/70 flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> 50 min • Ongoing Therapy
                                    </p>
                                </div>
                                <div className="text-left md:text-right bg-white/60 md:bg-transparent p-4 md:p-0 rounded-2xl w-full md:w-auto">
                                    <div className="text-4xl font-bold text-brand-green mb-1">11:00 AM</div>
                                    <div className="text-sm font-medium text-brand-green/70">Today, October 24th</div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 text-brand-green">
                                    <div className="bg-brand-green/10 p-2 rounded-full">
                                        <Video className="w-5 h-5 text-brand-green" />
                                    </div>
                                    <span className="font-bold">Secure Telehealth Link</span>
                                </div>
                                <span className="text-xs font-mono font-bold text-brand-green/50 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">ID: 110-442-998</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="flex-1 bg-brand-green hover:bg-brand-green/90 text-white font-bold h-14 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base">
                                    <Video className="w-5 h-5 mr-2" /> Start Call
                                </Button>
                                <Button variant="outline" className="flex-1 h-14 rounded-xl font-bold text-brand-green border-brand-green/20 hover:bg-brand-green hover:text-white transition-all text-base">
                                    <FileText className="w-5 h-5 mr-2" /> Review Notes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Client Matches */}
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-brand-orange/5 pb-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-brand-green/10 rounded-xl">
                                        <Users className="w-5 h-5 text-brand-green" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-brand-green">New Pending Matches</CardTitle>
                                </div>
                                <Badge className="bg-brand-orange hover:bg-brand-orange text-white font-bold">2 New</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {[
                                    { name: "Emily R.", matchScore: "95%", concern: "Anxiety & Stress", requested: "2 hours ago" },
                                    { name: "David T.", matchScore: "88%", concern: "Burnout", requested: "Yesterday" }
                                ].map((client, i) => (
                                    <div key={i} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:bg-gray-50/50 transition-colors">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-serif font-bold text-brand-green mb-1">{client.name}</h3>
                                                    <p className="text-brand-green/70 font-medium text-sm">Requested: {client.requested}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-brand-orange font-bold text-lg">{client.matchScore}</div>
                                                    <div className="text-xs text-brand-green/50 font-bold uppercase tracking-wide">Match</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                <Badge variant="secondary" className="bg-gray-100 text-brand-green/70 hover:bg-gray-200">{client.concern}</Badge>
                                                <Badge variant="secondary" className="bg-gray-100 text-brand-green/70 hover:bg-gray-200">CBT Preference</Badge>
                                            </div>
                                            <div className="pt-4 flex gap-3 text-sm font-bold">
                                                <Button size="sm" className="rounded-lg bg-brand-green hover:bg-brand-green/90 text-white">
                                                    Accept Match
                                                </Button>
                                                <Button variant="outline" size="sm" className="rounded-lg border-gray-200 text-gray-500 hover:bg-gray-50">
                                                    Review Profile
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">

                    {/* Calendar Widget */}
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] overflow-hidden">
                        <CardHeader className="pb-0 pt-6">
                            <CardTitle className="font-bold text-brand-green text-lg px-2">Your Schedule</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <Calendar
                                mode="single"
                                selected={new Date()}
                                className="rounded-xl w-full mx-auto"
                                classNames={{
                                    day_selected: "bg-brand-orange text-white hover:bg-brand-orange hover:text-white focus:bg-brand-orange focus:text-white",
                                    day_today: "bg-brand-orange/10 text-brand-orange",
                                }}
                            />
                            
                            <div className="mt-6 space-y-3 px-2">
                                <h4 className="text-xs font-bold text-brand-green/50 uppercase tracking-wider mb-2">Today&apos;s Appointments</h4>
                                <div className="bg-[#F5FBF2] p-4 rounded-xl flex items-center gap-4 border-l-4 border-brand-green shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="text-center shrink-0">
                                        <span className="block text-[10px] font-bold text-brand-green uppercase">OCT</span>
                                        <span className="block text-xl font-bold text-brand-green">24</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-green text-sm">Mark J.</p>
                                        <p className="text-xs text-brand-green/60 font-medium mt-0.5">11:00 AM - 11:50 AM</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Practice Tools Grid */}
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem]">
                        <CardHeader className="pb-4">
                            <CardTitle className="font-bold text-brand-green text-lg">Practice Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-brand-green/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-brand-green/10 hover:-translate-y-1 transition-all cursor-pointer group">
                                    <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <FileText className="w-6 h-6 text-brand-green" />
                                    </div>
                                    <span className="text-sm font-bold text-brand-green text-center">Clinical<br/>Notes</span>
                                </div>
                                <div className="bg-brand-orange/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-brand-orange/10 hover:-translate-y-1 transition-all cursor-pointer group">
                                    <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <TrendingUp className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <span className="text-sm font-bold text-brand-orange text-center">Earnings<br/>Report</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
