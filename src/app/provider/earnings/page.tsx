import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, DollarSign, Download, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TRANSACTIONS = [
    { id: "TXN-001", date: "Oct 24, 2023", description: "Payout - Weekly", amount: 1240.00, status: "Pending" },
    { id: "TXN-002", date: "Oct 24, 2023", description: "Session - Sarah Jenkins", amount: 120.00, status: "Completed" },
    { id: "TXN-003", date: "Oct 24, 2023", description: "Session - Michael Ross", amount: 120.00, status: "Completed" },
    { id: "TXN-004", date: "Oct 17, 2023", description: "Payout - Weekly", amount: 980.00, status: "Completed" },
];

export default function EarningsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
                    <p className="text-gray-500">Track your revenue and payout history.</p>
                </div>
                <Button variant="outline" className="border-gray-200 text-gray-700">
                    <Download className="w-4 h-4 mr-2" /> Download Report
                </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-none shadow-sm bg-brand-green text-white rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <p className="text-sm font-medium text-gray-300 mb-1">Available Balance</p>
                    <div className="text-4xl font-bold mb-4">$1,240.00</div>
                    <Button className="w-full bg-white text-brand-green hover:bg-gray-100 font-bold border-none">
                        Withdraw Now
                    </Button>
                </Card>

                <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue (Oct)</p>
                            <div className="text-3xl font-bold text-gray-900">$3,420.00</div>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-green h-full w-[70%]"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">70% of monthly goal ($5,000)</p>
                </Card>

                <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Pending Payouts</p>
                            <div className="text-3xl font-bold text-gray-900">$240.00</div>
                        </div>
                        <div className="p-2 bg-orange-50 text-brand-orange rounded-lg">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Scheduled for <span className="font-bold text-gray-900">Friday, Oct 27</span></p>
                </Card>
            </div>

            {/* Transactions */}
            <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                    <Button variant="link" className="text-brand-orange font-bold text-sm">View All</Button>
                </div>
                <div className="divide-y divide-gray-50">
                    {TRANSACTIONS.map((txn) => (
                        <div key={txn.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-600">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{txn.description}</p>
                                    <p className="text-xs text-gray-500">{txn.date} • {txn.id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${txn.amount > 1000 ? 'text-green-600' : 'text-gray-900'}`}>
                                    {txn.amount > 0 ? '+' : ''}${txn.amount.toFixed(2)}
                                </p>
                                <Badge variant="outline" className={`mt-1 border-0 ${txn.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
                                    }`}>
                                    {txn.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
