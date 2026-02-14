
import { getOracleInsights, getAllUsers, getUserInvoices } from "@/lib/db";
import {
    Activity,
    CreditCard,
    TrendingUp,
    Users,
    DollarSign,
    Target
} from "lucide-react";
import { RevenueChart } from "@/components/admin/revenue-chart";

// Mock data function - in production this would aggregate actual invoices
async function getRevenueStats() {
    return {
        mrr: 12450, // $12,450
        growth: 12.5, // +12.5%
        subscribers: 142,
        churnRate: 2.1
    };
}

export default async function AdminBillingPage() {
    const stats = await getRevenueStats();

    return (
        <div className="space-y-12 pb-32">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-emerald-500" />
                        Revenue Command
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Monetization & Subscription Matrix
                    </p>
                </div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-8 bg-slate-950 rounded-[2.5rem] border border-white/5 space-y-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-emerald-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">MRR</h3>
                        </div>
                        <span className="text-white font-black text-xl">${(stats.mrr / 100).toLocaleString()}</span>
                    </div>
                    <div className="space-y-2 relative z-10">
                        <div className="flex items-center gap-2 text-emerald-500 text-xs font-black">
                            <TrendingUp className="w-3 h-3" />
                            +{stats.growth}%
                        </div>
                        <p className="text-[9px] font-bold text-slate-500">vs Last Month</p>
                    </div>
                </div>

                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-blue-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subscribers</h3>
                        </div>
                        <span className="text-slate-900 dark:text-white font-black text-2xl">{stats.subscribers}</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">Active Paid Plans</p>
                </div>

                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-purple-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">ARPU</h3>
                        </div>
                        <span className="text-slate-900 dark:text-white font-black text-2xl">$87</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">Avg Revenue Per User</p>
                </div>

                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-red-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Churn</h3>
                        </div>
                        <span className="text-slate-900 dark:text-white font-black text-2xl">{stats.churnRate}%</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">Monthly retention loss</p>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase tracking-widest">Revenue Velocity</h3>
                </div>
                <div className="h-[300px] w-full">
                    <RevenueChart />
                </div>
            </div>
        </div>
    );
}
