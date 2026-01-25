import Link from "next/link";
import {
    Video,
    Calendar as CalendarIcon,
    Clock,
    MoreHorizontal,
    Book,
    Wind,
    Target,
    Headphones,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-brand-green">Good Morning, Ayush.</h1>
                <p className="text-muted-foreground mt-1">Your mental wellness journey is progressing well. Here is your overview for today.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Content (2 cols) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Upcoming Session Card */}
                    <Card className="border-none shadow-sm bg-gradient-to-br from-[#FFF8F0] to-white p-6 md:p-8 rounded-[2rem] relative overflow-hidden">
                        {/* Decorator */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <Badge variant="secondary" className="bg-[#E6F4F1] text-brand-green hover:bg-[#E6F4F1] mb-3 font-medium">
                                        Upcoming Session
                                    </Badge>
                                    <h2 className="text-2xl font-bold text-brand-green mb-1">Session with Dr. Sarah Chen</h2>
                                    <p className="text-muted-foreground">Cognitive Behavioral Therapy • 50 min</p>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <div className="text-4xl font-bold text-brand-orange">14:30</div>
                                    <div className="text-sm text-muted-foreground">Today, October 24th</div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between mb-8 border border-gray-100">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Video className="w-5 h-5 text-gray-400" />
                                    <span className="font-medium">Secure Video Link</span>
                                </div>
                                <span className="text-xs font-mono text-gray-400">ID: 884-291-002</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 rounded-xl shadow-md text-base">
                                    <Video className="w-5 h-5 mr-2" /> Join Video Call
                                </Button>
                                <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold text-brand-green border-gray-200 hover:bg-gray-50 hover:text-brand-green">
                                    <CalendarIcon className="w-5 h-5 mr-2" /> Reschedule
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Your Care Team */}
                    <Card className="border-none shadow-sm bg-white p-6 md:p-8 rounded-[2rem]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-orange-100 rounded-full">
                                    <Avatar className="h-5 w-5 text-brand-orange">
                                        <AvatarFallback className="bg-transparent text-brand-orange">
                                            <Video className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <h2 className="text-lg font-bold text-brand-green">Your Care Team</h2>
                            </div>
                            <Button variant="link" className="text-brand-orange font-bold text-sm">View Full Profile</Button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="relative w-full md:w-48 aspect-[4/3] rounded-2xl overflow-hidden shrink-0">
                                {/* Placeholder Image */}
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                    <span className="text-xs">Dr. Sarah Photo</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-brand-green">Dr. Sarah Chen, PsyD</h3>
                                    <p className="text-sm text-muted-foreground">Clinical Psychologist • 8 years exp</p>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Specializes in anxiety and stress management through mindfulness-based cognitive therapy. "My goal is to help you find your center and build resilience."
                                </p>
                                <div className="flex gap-2">
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100">Anxiety</Badge>
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100">Burnout</Badge>
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100">CBT</Badge>
                                </div>
                                <div className="pt-2 flex gap-4 text-sm font-medium underline text-gray-400 decoration-gray-300 underline-offset-4">
                                    <Link href="#" className="hover:text-brand-green transition-colors">Request Change</Link>
                                    <Link href="#" className="hover:text-brand-green transition-colors">Send Message</Link>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">

                    {/* Calendar Widget */}
                    <Card className="border-none shadow-sm bg-white p-6 rounded-[2rem] min-h-[400px]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-brand-green">October 2023</h3>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><ChevronLeft className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><ChevronRight className="w-4 h-4" /></Button>
                            </div>
                        </div>
                        {/* Simple HTML Calendar Mockup */}
                        <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-4">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        <div className="grid grid-cols-7 text-center text-sm gap-y-4 mb-8 text-gray-700 font-medium">
                            <span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                            <span>6</span><span>7</span><span>8</span><span>9</span>
                            <span className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto shadow-md">10</span>
                            <span>11</span><span>12</span>
                            <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
                            <span>20</span><span>21</span><span>22</span><span>23</span>
                            <span className="bg-brand-orange/10 text-brand-orange w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold">24</span>
                            <span>25</span>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Upcoming Appointments</h4>
                            <div className="bg-[#FFF8F0] p-4 rounded-xl flex items-center gap-4 relative overflow-hidden border-l-4 border-brand-orange">
                                <div className="text-center shrink-0">
                                    <span className="block text-xs font-bold text-gray-400 uppercase">OCT</span>
                                    <span className="block text-xl font-bold text-brand-green">24</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Therapy Session</p>
                                    <p className="text-xs text-gray-500">14:30 - 15:20</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 border-l-4 border-gray-200 opacity-60">
                                <div className="text-center shrink-0">
                                    <span className="block text-xs font-bold text-gray-400 uppercase">OCT</span>
                                    <span className="block text-xl font-bold text-gray-600">31</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Therapy Session</p>
                                    <p className="text-xs text-gray-500">14:30 - 15:20</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Tools */}
                    <Card className="border-none shadow-sm bg-white p-6 rounded-[2rem]">
                        <h3 className="font-bold text-brand-green mb-4">Quick Tools</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-sm transition-shadow cursor-pointer py-6">
                                <Book className="w-6 h-6 text-brand-orange" />
                                <span className="text-xs font-bold text-gray-700">Journal</span>
                            </div>
                            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-sm transition-shadow cursor-pointer py-6">
                                <Wind className="w-6 h-6 text-brand-orange" />
                                <span className="text-xs font-bold text-gray-700">Breathing</span>
                            </div>
                            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-sm transition-shadow cursor-pointer py-6">
                                <Target className="w-6 h-6 text-brand-orange" />
                                <span className="text-xs font-bold text-gray-700">Goals</span>
                            </div>
                            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-sm transition-shadow cursor-pointer py-6">
                                <Headphones className="w-6 h-6 text-brand-orange" />
                                <span className="text-xs font-bold text-gray-700">Support</span>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}
