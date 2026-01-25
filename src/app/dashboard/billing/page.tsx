import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, FileText, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
                <p className="text-gray-500">Manage your subscription and payment methods.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Current Plan */}
                <Card className="p-6 border-none shadow-sm bg-white rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-8 -mt-8"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-1">Current Plan</p>
                            <h2 className="text-2xl font-bold text-gray-900">Premium Care</h2>
                        </div>
                        <Badge className="bg-brand-green text-white hover:bg-brand-green">Active</Badge>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">$120<span className="text-sm font-medium text-gray-500">/session</span></div>
                    <p className="text-xs text-gray-500 mb-6">Next billing date: Nov 01, 2023</p>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Unlimited messaging</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Weekly video sessions (50m)</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 border-gray-200">Change Plan</Button>
                        <Button variant="outline" className="flex-1 border-gray-200 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100">Cancel</Button>
                    </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                    <h3 className="font-bold text-gray-900 mb-4">Payment Method</h3>
                    <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl mb-4 bg-gray-50/50">
                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <span className="font-bold text-[10px] text-gray-500">VISA</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm text-gray-900">Visa ending in 4242</p>
                            <p className="text-xs text-gray-500">Expires 12/24</p>
                        </div>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-600">Default</Badge>
                    </div>
                    <Button className="w-full bg-brand-green text-white hover:bg-green-800">
                        <CreditCard className="w-4 h-4 mr-2" /> Update Payment Method
                    </Button>
                </Card>
            </div>

            {/* Invoice History */}
            <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Billing History</h3>
                    <Button variant="link" className="text-brand-orange font-bold text-sm">View All</Button>
                </div>
                <div className="divide-y divide-gray-50">
                    {[
                        { id: "INV-2023-001", date: "Oct 24, 2023", amount: 120.00, status: "Paid" },
                        { id: "INV-2023-002", date: "Oct 17, 2023", amount: 120.00, status: "Paid" },
                        { id: "INV-2023-003", date: "Oct 10, 2023", amount: 120.00, status: "Paid" },
                    ].map((inv) => (
                        <div key={inv.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Session Fee</p>
                                    <p className="text-xs text-gray-500">{inv.date} • {inv.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-900">${inv.amount.toFixed(2)}</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 hidden sm:inline-flex">
                                    {inv.status}
                                </Badge>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
