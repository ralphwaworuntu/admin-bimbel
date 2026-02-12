"use client";

import { motion } from "framer-motion";
import {
    Users,
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Mail,
    Shield,
    Zap,
    History,
    ChevronDown,
    Award
} from "lucide-react";
import Link from "next/link";

const customers = [
    { id: 1, name: "Dominic Toretto", email: "dom@fast.family", status: "Active", plan: "Enterprise", spend: "$2.4k", lastActive: "2 mins ago", avatar: "https://i.pravatar.cc/100?u=dom" },
    { id: 2, name: "Letty Ortiz", email: "letty@nitro.io", status: "Active", plan: "Pro", spend: "$890", lastActive: "1 hour ago", avatar: "https://i.pravatar.cc/100?u=letty" },
    { id: 3, name: "Mia Toretto", email: "mia@engine.ai", status: "Inactive", plan: "Free", spend: "$0", lastActive: "3 days ago", avatar: "https://i.pravatar.cc/100?u=mia" },
    { id: 4, name: "Brian O'Conner", email: "brian@skyline.org", status: "Active", plan: "Enterprise+ AI", spend: "$12k", lastActive: "Just now", avatar: "https://i.pravatar.cc/100?u=brian" },
];

export default function CustomersPage() {
    return (
        <div className="p-8 lg:p-12 space-y-12 pb-32">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Customer Sovereign</h1>
                    <p className="text-slate-500 font-bold flex items-center gap-2">
                        Managing your multi-tenant ecosystem and user relationships.
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-brand/10 text-primary-brand text-[10px] font-black uppercase tracking-widest border border-primary-brand/20">
                            <Users className="w-3 h-3" /> 12.8k Users Total
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all uppercase tracking-widest">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button className="bg-primary-brand text-white px-8 py-4 rounded-2xl text-xs font-black flex items-center gap-3 shadow-xl shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                        Manage Segments
                    </button>
                </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Link href="/dashboard/analytics" className="bg-slate-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden group block hover:ring-2 hover:ring-primary-brand/50 transition-all text-left">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Award className="w-24 h-24 text-primary-brand" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">VIP Conversion</p>
                    <h3 className="text-3xl font-black mb-2">84 Users</h3>
                    <p className="text-xs font-bold text-slate-400">Upgraded to Enterprise+ this week. AI predicts 12 more by Sunday.</p>
                    <div className="mt-8 flex -space-x-3">
                        {atomsAvatar(['a', 'b', 'c', 'd'])}
                        <div className="w-8 h-8 rounded-full bg-primary-brand border-2 border-slate-900 flex items-center justify-center text-[10px] font-black">+14</div>
                    </div>
                </Link>

                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black tracking-tight">Active Relationship Index</h3>
                        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                            Optimal Engagement
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Weekly Active Users (WAU)</span>
                            <span className="text-slate-900 dark:text-white">92.4% Target met</span>
                        </div>
                        <div className="w-full h-4 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden p-1 border border-slate-100 dark:border-slate-700">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "92.4%" }}
                                transition={{ duration: 1.5 }}
                                className="h-full bg-primary-brand rounded-full shadow-[0_0_15px_rgba(129,6,209,0.3)]"
                            />
                        </div>
                        <p className="text-xs text-slate-500 font-bold">Your customer retention is 14% higher than the industry average for Sovereign platforms.</p>
                    </div>
                </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="relative w-full max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Find customers by name, email or ID..."
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 pl-12 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-primary-brand/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
                            Status: All <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className="h-4 w-px bg-slate-100 dark:bg-slate-800"></div>
                        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
                            Sort: Recent <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-slate-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Customer</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Plan</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Lifetime Spend</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((c, i) => (
                                <tr key={c.id} className="group border-b border-slate-50 dark:border-slate-800 last:border-none hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden">
                                                <img src={c.avatar} alt={c.name} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black">{c.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400">{c.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${c.plan.includes('Enterprise') ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                                            {c.plan}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest">{c.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-mono text-xs font-black">{c.spend}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <History className="w-3 h-3" /> {c.lastActive}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a href={`mailto:${c.email}`} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary-brand transition-all">
                                                <Mail className="w-4 h-4" />
                                            </a>
                                            <Link href="/nexus">
                                                <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary-brand transition-all">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function atomsAvatar(seeds: string[]) {
    return seeds.map((s, i) => (
        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
            <img src={`https://i.pravatar.cc/50?u=${s}`} alt="atom" />
        </div>
    ));
}
