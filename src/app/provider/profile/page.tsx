import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Globe } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Provider Profile</h1>
                    <p className="text-gray-500">Manage your public profile and settings.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-gray-600">Cancel</Button>
                    <Button className="bg-brand-green text-white hover:bg-green-800">Save Changes</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Quick Info */}
                <div className="space-y-6">
                    <Card className="p-6 border-none shadow-sm bg-white rounded-2xl text-center">
                        <div className="relative inline-block mb-4">
                            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                <AvatarImage src="https://i.pravatar.cc/150?u=emily_carter" />
                                <AvatarFallback className="text-2xl">EC</AvatarFallback>
                            </Avatar>
                            <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-brand-orange text-white hover:bg-orange-600 border-2 border-white shadow-sm">
                                <Camera className="w-4 h-4" />
                            </Button>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Dr. Emily Carter</h2>
                        <p className="text-sm text-gray-500 mb-4">Clinical Psychologist</p>

                        <div className="flex justify-center gap-2 mb-6">
                            <Badge variant="secondary" className="bg-green-50 text-green-700">Verified</Badge>
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700">Top Rated</Badge>
                        </div>

                        <div className="space-y-3 text-left text-sm">
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>New York, NY (EST)</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <span>English, Spanish</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Edit Form */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="p-6 border-none shadow-sm bg-white rounded-2xl space-y-6">
                        <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input defaultValue="Emily" />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input defaultValue="Carter" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Professional Title</Label>
                            <Input defaultValue="Clinical Psychologist, PsyD" />
                        </div>
                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea
                                className="min-h-[120px]"
                                defaultValue="Dr. Emily Carter is a licensed clinical psychologist specializing in anxiety disorders, depression, and trauma. She utilizes evidence-based approaches including CBT and mindfulness-based therapies..."
                            />
                        </div>
                    </Card>

                    <Card className="p-6 border-none shadow-sm bg-white rounded-2xl space-y-6">
                        <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4">Specialties & Tags</h3>
                        <div>
                            <Label className="mb-2 block">Specialties</Label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <Badge className="bg-brand-green/10 text-brand-green hover:bg-brand-green/20 cursor-pointer">Anxiety ×</Badge>
                                <Badge className="bg-brand-green/10 text-brand-green hover:bg-brand-green/20 cursor-pointer">Depression ×</Badge>
                                <Badge className="bg-brand-green/10 text-brand-green hover:bg-brand-green/20 cursor-pointer">Trauma ×</Badge>
                                <Badge variant="outline" className="border-dashed cursor-pointer hover:bg-gray-50">+ Add Specialty</Badge>
                            </div>
                        </div>
                        <div>
                            <Label className="mb-2 block">Treatment Approaches</Label>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">CBT</Badge>
                                <Badge variant="secondary">Mindfulness</Badge>
                                <Badge variant="secondary">EMDR</Badge>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
