import {
    Users,
    UserPlus,
    DollarSign,
    Video,
    FileText,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProviderDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Good Morning, Dr. Carter</h1>
                    <p className="text-gray-500 mt-1">You have 4 sessions scheduled for today.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">TODAY</p>
                    <p className="text-xl font-bold text-gray-900">October 24, 2023</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Total Patients */}
                <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-sm font-medium text-gray-500">Total Patients</p>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">24</div>
                    <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                        <span className="text-[10px]">↗</span> +2 this week
                    </p>
                </Card>

                {/* Pending Matches */}
                <Card className="p-6 border-none shadow-sm bg-white rounded-2xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-medium text-gray-500">Pending Matches</p>
                            <div className="p-2 bg-orange-100 rounded-lg text-brand-orange">
                                <UserPlus className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">3</div>
                        <p className="text-xs font-bold text-brand-orange">Action required</p>
                    </div>
                </Card>

                {/* Next Payout */}
                <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-sm font-medium text-gray-500">Next Payout</p>
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">$1,240</div>
                    <p className="text-xs font-medium text-gray-400">Due on Friday, Oct 27</p>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Schedule (2 cols wide) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Today's Schedule</h2>
                        <Button variant="link" className="text-brand-orange font-bold text-sm">View Calendar</Button>
                    </div>

                    <div className="space-y-4">
                        {/* Active Session */}
                        <Card className="p-1 border shadow-sm bg-white rounded-2xl border-l-[6px] border-l-brand-orange">
                            <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 cursor-pointer">
                                        <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
                                        <AvatarFallback>SJ</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Sarah Jenkins</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-sm text-gray-500">10:00 AM - 10:50 AM</p>
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-normal text-xs">Anxiety Intake</Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-md">
                                    <Video className="w-4 h-4 mr-2" /> Join Video
                                </Button>
                            </div>
                        </Card>

                        {/* Upcoming Session */}
                        <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 bg-gray-100 text-gray-500">
                                        <AvatarFallback>MR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Michael Ross</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-sm text-gray-500">11:30 AM - 12:20 PM</p>
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-normal text-xs">CBT Follow-up</Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="secondary" className="w-full sm:w-auto bg-gray-50 text-gray-600 border border-gray-100 font-bold rounded-xl">
                                    View Notes
                                </Button>
                            </div>
                        </Card>

                        {/* Upcoming Session 2 */}
                        <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src="https://i.pravatar.cc/150?u=jessica" />
                                        <AvatarFallback>JL</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Jessica Lee</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-sm text-gray-500">02:00 PM - 02:50 PM</p>
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-normal text-xs">Crisis Intervention</Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="secondary" className="w-full sm:w-auto bg-gray-50 text-gray-600 border border-gray-100 font-bold rounded-xl">
                                    View Notes
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Pending Matches & Notes */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Matches</h2>
                        <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex gap-3">
                                    <Avatar className="h-12 w-12 rounded-xl">
                                        <AvatarImage src="https://i.pravatar.cc/150?u=emily" />
                                        <AvatarFallback className="rounded-xl">ED</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Emily D.</h3>
                                        <p className="text-xs font-bold text-green-600 mt-1">Matching Score: 95%</p>
                                    </div>
                                </div>
                                <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 uppercase text-[10px] tracking-wider">New</Badge>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 font-medium text-[10px]">Depression</Badge>
                                <Badge variant="secondary" className="bg-purple-50 text-purple-600 hover:bg-purple-50 font-medium text-[10px]">Stress</Badge>
                            </div>

                            <p className="text-xs text-gray-500 leading-relaxed mb-6">
                                Looking for a therapist who specializes in workplace stress and can help with...
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="rounded-xl border-gray-200 font-bold text-gray-600 h-10 hover:bg-gray-50 hover:text-red-500 hover:border-red-100">
                                    Decline
                                </Button>
                                <Button className="rounded-xl bg-orange-50 text-brand-orange hover:bg-orange-100 font-bold h-10 border border-orange-100 shadow-none">
                                    Accept
                                </Button>
                            </div>
                            <p className="text-center text-xs text-gray-400 mt-4 cursor-pointer hover:text-brand-orange transition-colors">View 2 other matches</p>
                        </Card>
                    </div>

                    <Card className="p-6 border-none shadow-sm bg-[#1D3C34] rounded-2xl text-white relative overflow-hidden">
                        {/* Decorator Circles */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl mr-4 mb-4"></div>

                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Clinical Note</h3>
                            <p className="text-sm text-gray-300 leading-relaxed mb-6">
                                You have 3 unsigned notes from yesterday's sessions. Please review them before the end of the week.
                            </p>
                            <Button variant="link" className="p-0 h-auto text-brand-orange font-bold text-sm hover:text-white transition-colors group">
                                Review Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
