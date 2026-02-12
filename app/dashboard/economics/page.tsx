"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    DollarSign,
    CreditCard,
    Activity,
    Zap,
    BarChart3,
    ArrowUpRight,
    Target,
    Wallet,
    Sparkles,
    Calendar,
    CheckCircle
} from "lucide-react";
import Link from "next/link";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell
} from "recharts";

const revenueData = [
    { name: "Jan", amount: 45000, target: 40000 },
    { name: "Feb", amount: 52000, target: 42000 },
    { name: "Mar", amount: 48000, target: 45000 },
    { name: "Apr", amount: 61000, target: 48000 },
    { name: "May", amount: 75000, target: 52000 },
    { name: "Jun", amount: 92000, target: 55000 },
];

export default function EconomicsPage() {
    return (
        <div className="space-y-8 lg:space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Economic Matrix</h1>
                    <p className="text-slate-500 font-bold flex flex-wrap items-center gap-2">
                        Financial intelligence and projections.
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                            <TrendingUp className="w-3 h-3" /> Growth Accelerated
                        </span>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all uppercase tracking-widest shrink-0">
                        <Calendar className="w-4 h-4" /> Q1-2026
                    </button>
                    <Link href="/dashboard/billing">
                        <button className="bg-primary-brand text-white px-5 py-2.5 rounded-xl text-[10px] font-black shadow-xl shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shrink-0">
                            Billing
                        </button>
                    </Link>
                </div>
            </div>

            {/* Core Financial Grid - Elastic Stacking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                {[
                    { label: "ARR (Annual)", value: "$1.24M", trend: "+18.2%", icon: DollarSign },
                    { label: "MRR (Monthly)", value: "$103k", trend: "+12.5%", icon: CreditCard },
                    { label: "Token Use", value: "84.2B", trend: "+42.1%", icon: Zap },
                    { label: "Gross Margin", value: "92.4%", trend: "+2.1%", icon: Activity },
                ].map((stat, i) => (
                    <Link
                        key={stat.label}
                        href="/dashboard/billing"
                        className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden hover:border-primary-brand/30 transition-all block"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="relative z-10">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-brand transition-colors mb-6">
                                    <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                                </div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{stat.label}</p>
                                <div className="flex items-end justify-between gap-4">
                                    <p className="text-xl lg:text-2xl font-black tracking-tight truncate">{stat.value}</p>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full shrink-0 ${stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10">
                {/* Revenue Projection Matrix - Flexible and Elastic */}
                <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-10 shadow-sm min-h-[400px] lg:h-[500px] flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 text-center sm:text-left">
                        <div>
                            <h3 className="text-xl font-black tracking-tight italic">Growth Prophecy</h3>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">Milestone Performance</p>
                        </div>
                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary-brand"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Actual</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Target</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 w-full overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 800, fill: '#94A3B8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 800, fill: '#94A3B8' }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                    width={35}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(129, 6, 209, 0.03)' }}
                                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '12px' }}
                                />
                                <Bar dataKey="target" fill="rgba(226, 232, 240, 0.5)" radius={[6, 6, 0, 0]} barSize={20} />
                                <Bar dataKey="amount" fill="#8106D1" radius={[6, 6, 0, 0]} barSize={20}>
                                    {revenueData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === revenueData.length - 1 ? '#8106D1' : '#A855F7'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Ecosystem Value Breakdown - Adaptive */}
                <div className="xl:col-span-1 bg-slate-950 text-white border border-white/10 rounded-[2.2rem] lg:rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                    <div>
                        <h3 className="text-xl font-black tracking-tight mb-2">Resource Alpha</h3>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-8">Unit Economic Analysis</p>

                        <div className="space-y-6">
                            {[
                                { label: "Compute Nodes", value: "$12.4k", share: "45%", trend: "up" },
                                { label: "Edge Gateway", value: "$8.2k", share: "21%", trend: "down" },
                                { label: "Oracle AI API", value: "$14.5k", share: "34%", trend: "up" },
                            ].map((cost, i) => (
                                <div key={i} className="flex items-center justify-between gap-4 group cursor-help">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-1 h-6 rounded-full ${cost.trend === 'up' ? 'bg-primary-brand' : 'bg-emerald-500'}`}></div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-black truncate">{cost.label}</p>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{cost.share} OF TOTAL</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-mono font-black shrink-0">{cost.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 relative z-10 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-primary-brand fill-primary-brand/20" />
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-primary-brand">Optimization Oracle</p>
                        </div>
                        <p className="text-xs font-bold text-slate-400 mb-5 leading-relaxed">Scaling Tokyo nodes to reserved capacity could yield <span className="text-emerald-500 font-black">$1,400/mo</span> savings.</p>
                        <Link href="/dashboard/deployments">
                            <button className="text-[10px] font-black uppercase tracking-widest text-white hover:text-primary-brand transition-all flex items-center gap-2 group/btn">
                                Apply Strategy <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    {/* Dynamic Atmosphere */}
                    <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-primary-brand/10 blur-[100px] rounded-full pointer-events-none"></div>
                </div>
            </div>

            {/* Tactical Milestones - Elastic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                    { label: "Break-even velocity", value: "May 2026", status: "Achieved", icon: CheckCircle },
                    { label: "Series A Readiness", value: "92% Score", status: "Critical", icon: Target },
                    { label: "Liquidity Pulse", value: "$420k Opt.", status: "Stable", icon: Wallet },
                ].map((item, i) => (
                    <Link key={i} href="/nexus" className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-primary-brand/20 transition-all gap-4 text-left">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-brand transition-colors shrink-0 border border-slate-100 dark:border-slate-700">
                                <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">{item.label}</p>
                                <p className="text-xs lg:text-sm font-black tracking-tight truncate">{item.value}</p>
                            </div>
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full shrink-0 ${item.status === 'Achieved' ? 'bg-emerald-500/10 text-emerald-500' : (item.status === 'Critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-500')}`}>
                            {item.status}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
