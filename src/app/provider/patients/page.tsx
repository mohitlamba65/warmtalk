import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, FileText, MessageSquare } from "lucide-react";

const PATIENTS = [
    { name: "Sarah Jenkins", id: "001", status: "Active", nextSession: "Today, 10:00 AM", condition: "Anxiety", image: "https://i.pravatar.cc/150?u=sarah" },
    { name: "Michael Ross", id: "002", status: "Active", nextSession: "Today, 11:30 AM", condition: "Depression", image: "https://i.pravatar.cc/150?u=michael" },
    { name: "Jessica Lee", id: "003", status: "Active", nextSession: "Today, 02:00 PM", condition: "PTSD", image: "https://i.pravatar.cc/150?u=jessica" },
    { name: "David Chen", id: "004", status: "Paused", nextSession: "Nov 02, 09:00 AM", condition: "Burnout", image: "https://i.pravatar.cc/150?u=david" },
    { name: "Emily Watson", id: "005", status: "New", nextSession: "Pending", condition: "Stress", image: "https://i.pravatar.cc/150?u=emily" },
];

export default function PatientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
                    <p className="text-gray-500">Manage your active patient roster and records.</p>
                </div>
                <Button className="bg-brand-green text-white hover:bg-green-800">
                    Add New Patient
                </Button>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-400 font-bold tracking-wider">
                                <th className="p-6">Patient</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Condition</th>
                                <th className="p-6">Next Session</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {PATIENTS.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={patient.image} />
                                                <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-gray-900">{patient.name}</p>
                                                <p className="text-xs text-gray-400">ID: #{patient.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <Badge variant="secondary" className={`${patient.status === 'Active' ? 'bg-green-50 text-green-700' :
                                                patient.status === 'Paused' ? 'bg-yellow-50 text-yellow-700' :
                                                    'bg-blue-50 text-blue-700'
                                            }`}>
                                            {patient.status}
                                        </Badge>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-sm font-medium text-gray-600">{patient.condition}</span>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-sm text-gray-500">{patient.nextSession}</span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-orange">
                                                <MessageSquare className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-green">
                                                <FileText className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
