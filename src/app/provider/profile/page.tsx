import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Globe, CheckCircle2, ShieldCheck, X } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-brand-green tracking-tight">Provider Profile</h1>
                    <p className="text-brand-green/70 font-medium mt-1">Manage your public profile and clinical settings.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-brand-green/20 text-brand-green font-bold hover:bg-brand-green/5 h-12 px-6 rounded-xl">Cancel</Button>
                    <Button className="flex-1 md:flex-none bg-brand-green text-white hover:bg-green-800 font-bold h-12 px-6 shadow-md hover:shadow-lg transition-all rounded-xl">Save Changes</Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column: Avatar & Quick Info */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] overflow-hidden text-center sticky top-8">
                        {/* Decorative Top Banner */}
                        <div className="h-24 bg-gradient-to-r from-brand-green/20 to-brand-orange/20 w-full absolute top-0 left-0"></div>
                        
                        <CardContent className="pt-12 px-6 pb-8 relative z-10">
                            <div className="relative inline-block mb-6 group">
                                <Avatar className="w-32 h-32 border-4 border-white shadow-xl bg-white">
                                    <AvatarImage src="https://i.pravatar.cc/150?u=emily_carter" className="object-cover" />
                                    <AvatarFallback className="text-3xl font-serif font-bold text-brand-green bg-brand-green/5">EC</AvatarFallback>
                                </Avatar>
                                <Button size="icon" className="absolute bottom-2 right-2 rounded-full bg-brand-orange hover:bg-orange-600 text-white border-2 border-white shadow-md transform group-hover:scale-110 transition-transform h-10 w-10">
                                    <Camera className="w-4 h-4" />
                                </Button>
                            </div>
                            
                            <h2 className="text-2xl font-serif font-bold text-brand-green mb-1">Dr. Emily Carter</h2>
                            <p className="text-brand-green/70 font-medium mb-6">Clinical Psychologist</p>

                            <div className="flex justify-center gap-2 mb-8">
                                <Badge variant="secondary" className="bg-[#E6F4F1] text-brand-green hover:bg-[#E6F4F1] font-bold px-3 py-1">
                                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                                </Badge>
                                <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/10 font-bold px-3 py-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Top Rated
                                </Badge>
                            </div>

                            <div className="space-y-4 text-left p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3 text-brand-green/80 font-medium">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <MapPin className="w-4 h-4 text-brand-orange" />
                                    </div>
                                    <span>New York, NY (EST)</span>
                                </div>
                                <div className="flex items-center gap-3 text-brand-green/80 font-medium">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Globe className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span>English, Spanish</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Edit Form */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-brand-green/5 border-b border-brand-green/10 pb-6 pt-8 px-8">
                            <CardTitle className="text-xl font-bold text-brand-green">Basic Information</CardTitle>
                            <CardDescription className="text-brand-green/60 font-medium">This information will be displayed publicly to potential clients.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-brand-green font-bold text-sm">First Name</Label>
                                    <Input defaultValue="Emily" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-brand-green/20" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-brand-green font-bold text-sm">Last Name</Label>
                                    <Input defaultValue="Carter" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-brand-green/20" />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <Label className="text-brand-green font-bold text-sm">Professional Title</Label>
                                <Input defaultValue="Clinical Psychologist, PsyD" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-brand-green/20" />
                            </div>
                            
                            <div className="space-y-3">
                                <Label className="text-brand-green font-bold text-sm flex justify-between">
                                    <span>Professional Bio</span>
                                    <span className="text-brand-green/40 font-normal">0 / 500</span>
                                </Label>
                                <Textarea
                                    className="min-h-[160px] rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-brand-green/20 resize-none p-4 leading-relaxed"
                                    defaultValue="Dr. Emily Carter is a licensed clinical psychologist specializing in anxiety disorders, depression, and trauma. She utilizes evidence-based approaches including CBT and mindfulness-based therapies..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-brand-green/5 border-b border-brand-green/10 pb-6 pt-8 px-8">
                            <CardTitle className="text-xl font-bold text-brand-green">Clinical Focus</CardTitle>
                            <CardDescription className="text-brand-green/60 font-medium">Select the areas where you have the most expertise.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div>
                                <Label className="text-brand-green font-bold text-sm mb-4 block">Specialties (Max 5)</Label>
                                <div className="flex flex-wrap gap-3">
                                    <Badge className="bg-brand-green text-white hover:bg-green-800 cursor-pointer pl-4 pr-2 py-1.5 rounded-lg font-medium text-sm gap-2">
                                        Anxiety <div className="bg-white/20 p-0.5 rounded-md hover:bg-white/40 transition-colors"><X className="w-3 h-3" /></div>
                                    </Badge>
                                    <Badge className="bg-brand-green text-white hover:bg-green-800 cursor-pointer pl-4 pr-2 py-1.5 rounded-lg font-medium text-sm gap-2">
                                        Depression <div className="bg-white/20 p-0.5 rounded-md hover:bg-white/40 transition-colors"><X className="w-3 h-3" /></div>
                                    </Badge>
                                    <Badge className="bg-brand-green text-white hover:bg-green-800 cursor-pointer pl-4 pr-2 py-1.5 rounded-lg font-medium text-sm gap-2">
                                        Trauma <div className="bg-white/20 p-0.5 rounded-md hover:bg-white/40 transition-colors"><X className="w-3 h-3" /></div>
                                    </Badge>
                                    <Button variant="outline" className="border-dashed border-2 border-brand-green/20 text-brand-green hover:bg-brand-green/5 transition-colors h-[34px] rounded-lg text-sm font-bold">
                                        + Add Specialty
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <Label className="text-brand-green font-bold text-sm mb-4 block">Treatment Approaches</Label>
                                <div className="flex flex-wrap gap-3">
                                    <Badge variant="outline" className="bg-white border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white cursor-pointer px-4 py-1.5 rounded-lg transition-colors font-medium">CBT</Badge>
                                    <Badge className="bg-brand-orange text-white hover:bg-orange-600 cursor-pointer px-4 py-1.5 rounded-lg shadow-sm transition-colors font-medium">Mindfulness</Badge>
                                    <Badge variant="outline" className="bg-white border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white cursor-pointer px-4 py-1.5 rounded-lg transition-colors font-medium">EMDR</Badge>
                                    <Badge variant="outline" className="bg-white border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white cursor-pointer px-4 py-1.5 rounded-lg transition-colors font-medium">DBT</Badge>
                                    <Badge variant="outline" className="bg-white border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white cursor-pointer px-4 py-1.5 rounded-lg transition-colors font-medium">ACT</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <div className="flex justify-end pt-4">
                        <Button className="bg-brand-green text-white hover:bg-green-800 font-bold h-14 px-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-xl text-lg w-full md:w-auto">
                            Save Profile Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
