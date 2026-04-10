import Link from "next/link";
import {
    Video,
    Clock,
    Book,
    Wind,
    Target,
    Headphones,
    MessageCircle,
    FileText,
    Calendar as CalendarIcon,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDashboardDataAction } from "@/app/actions/dashboard.actions";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    if(!session) {
        redirect("/auth/login");
    }

    const stats = await getDashboardDataAction();
    const nextSession = stats.upcomingSessions[0];
    
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-green tracking-tight">
                    Welcome back, {session.user?.name}!
                </h1>
                <p className="text-brand-green/70 mt-2 text-lg">Your mental wellness journey is progressing well. Here is your overview for today.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Content (2 cols) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Upcoming Session Card */}
                    {nextSession ? (
                        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gradient-to-br from-[#FFF8F0] to-white rounded-[2rem] relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                        {/* Decorator */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <CardContent className="p-6 md:p-8 relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                                <div>
                                    <Badge variant="secondary" className="bg-brand-green/10 text-brand-green hover:bg-brand-green/20 mb-4 px-3 py-1 font-bold tracking-wide uppercase text-xs">
                                        Next Session
                                    </Badge>
                                    <h2 className="text-2xl font-serif font-bold text-brand-green mb-2">Session with {nextSession.therapistName}</h2>
                                    <p className="text-brand-green/70 flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> 50 min • Therapy Session
                                    </p>
                                </div>
                                <div className="text-left md:text-right bg-white/60 md:bg-transparent p-4 md:p-0 rounded-2xl w-full md:w-auto">
                                    <div className="text-4xl font-bold text-brand-orange mb-1">
                                        {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(nextSession.startTime))}
                                    </div>
                                    <div className="text-sm font-medium text-brand-green/70">
                                        {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(nextSession.startTime))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border border-white shadow-sm">
                                <div className="flex items-center gap-3 text-brand-green">
                                    <div className="bg-brand-green/10 p-2 rounded-full">
                                        <Video className="w-5 h-5 text-brand-green" />
                                    </div>
                                    <span className="font-bold">Secure Video Link</span>
                                </div>
                                <span className="text-xs font-mono font-bold text-brand-green/50 bg-gray-100 px-3 py-1.5 rounded-lg">ID: 884-291-002</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-bold h-14 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base">
                                    <Video className="w-5 h-5 mr-2" /> Join Video Call
                                </Button>
                                <Button variant="outline" className="flex-1 h-14 rounded-xl font-bold text-brand-green border-brand-green/20 hover:bg-brand-green hover:text-white transition-all text-base">
                                    <CalendarIcon className="w-5 h-5 mr-2" /> Reschedule
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    ) : null}

                    {/* Your Care Team */}
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-brand-green/5 pb-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-brand-orange/10 rounded-xl">
                                        <Headphones className="w-5 h-5 text-brand-orange" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-brand-green">Your Care Team</CardTitle>
                                </div>
                                <Button variant="ghost" className="text-brand-orange font-bold hover:bg-brand-orange/10 rounded-full h-8 px-3 text-sm">
                                    Manage
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-brand-green/5 shadow-md shrink-0 rounded-2xl">
                                    {stats.assignedTherapist?.avatar && <AvatarImage src={stats.assignedTherapist.avatar} className="object-cover" />}
                                    <AvatarFallback className="bg-brand-green/5 text-brand-green font-bold text-2xl rounded-2xl">{stats.assignedTherapist ? stats.assignedTherapist.name.charAt(0) : "T"}</AvatarFallback>
                                </Avatar>

                                <div className="space-y-4 flex-1">
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-brand-green mb-1">{stats.assignedTherapist?.name || "Pending Assignment"}</h3>
                                        {stats.assignedTherapist && <p className="text-brand-green/70 font-medium">Licensed Therapist • {stats.assignedTherapist.yearsExperience || 0} years exp</p>}
                                    </div>
                                    <p className="text-sm text-brand-green/80 leading-relaxed italic bg-gray-50 p-4 rounded-xl border-l-4 border-brand-orange">
                                        "{stats.assignedTherapist?.bio || "We are currently pairing you with the perfect professional."}"
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {stats.assignedTherapist?.specialties.map(spec => (
                                            <Badge key={spec} variant="secondary" className="bg-brand-green/5 text-brand-green hover:bg-brand-green/10">{spec.replace("_", " ")}</Badge>
                                        ))}
                                    </div>
                                    <div className="pt-4 flex gap-3 text-sm font-bold">
                                        <Button variant="outline" size="sm" className="rounded-lg border-brand-green/20 text-brand-green hover:bg-brand-green/5 relative">
                                            <MessageCircle className="w-4 h-4 mr-2" /> Message
                                            {stats.unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{stats.unreadCount}</span>}
                                        </Button>
                                        <Button variant="outline" size="sm" className="rounded-lg border-brand-green/20 text-brand-green hover:bg-brand-green/5">
                                            <FileText className="w-4 h-4 mr-2" /> Notes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for extra data */}
                    <Tabs defaultValue="history" className="w-full">
                        <TabsList className="bg-brand-green/5 p-1 rounded-xl w-full justify-start h-auto">
                            <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-green text-brand-green/60 font-bold py-2.5 px-6">Session History</TabsTrigger>
                            <TabsTrigger value="goals" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-green text-brand-green/60 font-bold py-2.5 px-6">Treatment Goals</TabsTrigger>
                        </TabsList>
                        <TabsContent value="history" className="mt-6">
                            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                                <div className="divide-y divide-gray-100">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-brand-green/5 p-3 rounded-xl group-hover:bg-brand-green/10 transition-colors">
                                                    <CalendarIcon className="w-5 h-5 text-brand-green" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-brand-green">Therapy Session</p>
                                                    <p className="text-xs text-brand-green/60">Oct {24 - (i*7)}, 2023</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-brand-green/60 border-brand-green/20">Completed</Badge>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" className="w-full rounded-none py-6 text-brand-orange font-bold hover:bg-brand-orange/5 hover:text-orange-600">
                                    View All History <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Card>
                        </TabsContent>
                        <TabsContent value="goals" className="mt-6 text-center py-12 bg-white rounded-2xl border-none shadow-sm">
                            <Target className="w-12 h-12 text-brand-orange/50 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-brand-green">No goals set yet</h3>
                            <p className="text-sm text-brand-green/60 mt-1 mb-4">Work with your therapist to establish treatment goals.</p>
                            <Button variant="outline" className="rounded-full border-brand-green/20 text-brand-green">Set New Goal</Button>
                        </TabsContent>
                    </Tabs>

                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">

                    {/* Calendar Widget */}
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] overflow-hidden">
                        <CardHeader className="pb-0 pt-6">
                            <CardTitle className="font-bold text-brand-green text-lg px-2">Schedule</CardTitle>
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
                                <h4 className="text-xs font-bold text-brand-green/50 uppercase tracking-wider mb-2">Upcoming</h4>
                                {stats.upcomingSessions.length > 0 ? stats.upcomingSessions.map((sess, idx) => (
                                    <div key={idx} className="bg-[#FFF8F0] p-4 rounded-xl flex items-center gap-4 border-l-4 border-brand-orange shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="text-center shrink-0">
                                            <span className="block text-[10px] font-bold text-brand-orange uppercase">
                                                {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(sess.startTime))}
                                            </span>
                                            <span className="block text-xl font-bold text-brand-orange">
                                                {new Date(sess.startTime).getDate()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-green text-sm">Therapy Session</p>
                                            <p className="text-xs text-brand-green/60 font-medium mt-0.5">
                                                {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(sess.startTime))} - {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(sess.endTime))}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-sm font-medium text-brand-green/60 italic text-center py-4 bg-gray-50 rounded-xl">No upcoming appointments</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Tools Grid */}
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem]">
                        <CardHeader className="pb-4">
                            <CardTitle className="font-bold text-brand-green text-lg">Self-Care Tools</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-brand-green/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-brand-green/10 hover:-translate-y-1 transition-all cursor-pointer group">
                                    <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <Book className="w-6 h-6 text-brand-green" />
                                    </div>
                                    <span className="text-sm font-bold text-brand-green">Journal</span>
                                </div>
                                <div className="bg-brand-orange/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-brand-orange/10 hover:-translate-y-1 transition-all cursor-pointer group">
                                    <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <Wind className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <span className="text-sm font-bold text-brand-orange">Breathing</span>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-blue-100 hover:-translate-y-1 transition-all cursor-pointer group">
                                    <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <Target className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-bold text-blue-700">Goals</span>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-purple-100 hover:-translate-y-1 transition-all cursor-pointer group">
                                    <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <Headphones className="w-6 h-6 text-purple-500" />
                                    </div>
                                    <span className="text-sm font-bold text-purple-700">Audio</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
