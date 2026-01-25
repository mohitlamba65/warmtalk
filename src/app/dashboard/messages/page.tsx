import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MoreVertical, Phone, Video } from "lucide-react";

export default function MessagesPage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <Input placeholder="Search messages..." className="bg-gray-50 border-transparent rounded-xl" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 bg-orange-50/50 border-l-4 border-brand-orange cursor-pointer hover:bg-orange-50">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
                                <AvatarFallback>DC</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-sm text-gray-900 truncate">Dr. Carter</h3>
                                    <span className="text-xs font-bold text-brand-orange">10:42 AM</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">Let's verify your next session time.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://i.pravatar.cc/150?u=support" />
                                <AvatarFallback>SP</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-sm text-gray-900 truncate">WarmTalk Support</h3>
                                    <span className="text-xs text-gray-400">Yesterday</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">Your receipt for Oct 24 is ready.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
                            <AvatarFallback>DC</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-bold text-gray-900">Dr. Emily Carter</h2>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="text-xs text-green-600 font-medium">Online</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-green"><Phone className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-green"><Video className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900"><MoreVertical className="w-5 h-5" /></Button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-soft-bg/30">
                    <div className="flex justify-center">
                        <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">Today</span>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-brand-orange text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                            Hi Dr. Carter, I wanted to double check if we can move our session 30 mins later?
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 text-gray-700 p-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm shadow-sm">
                            Hi Ayush! Yes, that works perfectly for me. See you at 10:30 AM instead.
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-brand-orange text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                            Great, thank you!
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                    <div className="relative">
                        <Input placeholder="Type a message..." className="pr-12 rounded-xl bg-gray-50 border-transparent focus:bg-white" />
                        <Button size="icon" className="absolute right-1 top-1 h-8 w-8 bg-brand-green hover:bg-green-700 rounded-lg">
                            <Send className="w-4 h-4 text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
