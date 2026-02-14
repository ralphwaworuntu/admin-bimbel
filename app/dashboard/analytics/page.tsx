"use client";

import { motion } from "framer-motion";
import {
    Activity,
    Globe,
    Users,
    MousePointer2,
    TrendingUp,
    Zap,
    Sparkles,
    Filter,
    Calendar,
} from "lucide-react";
import Link from "next/link";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { GlobalHeatmap } from "@/components/dashboard/global-heatmap";

const performanceData = [
    { name: "00:00", value: 240 },
    { name: "04:00", value: 120 },
    { name: "08:00", value: 380 },
    { name: "12:00", value: 890 },
    { name: "16:00", value: 1200 },
    { name: "20:00", value: 950 },
    { name: "23:59", value: 640 },
];

const trafficSourceData = [
    { name: "Direct", value: 45, color: "#8106D1" },
    { name: "Social", value: 30, color: "#6366F1" },
    { name: "Organic", value: 15, color: "#10B981" },
    { name: "Referral", value: 10, color: "#F59E0B" },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8 lg:space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2 truncate">Universal Analytics</h1>
                    <p className="text-zinc-500 font-bold flex flex-wrap items-center gap-2">
                        Deep-dive intelligence.
                        <Link href="/dashboard/deployments" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 hover:bg-indigo-500/20 transition-all">
                            <Activity className="w-3 h-3" /> Real-time
                        </Link>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-sm hover:bg-zinc-50 transition-all uppercase tracking-widest">
                        <Calendar className="w-4 h-4" /> 30D
                    </button>
                    <button className="px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-sm hover:bg-zinc-50 transition-all uppercase tracking-widest">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                </div>
            </div>

            {/* Core Metrics Grid - Elastic Stacking for split-screen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                {[
                    { label: "Active Sessions", value: "8,432", trend: "+12.5%", icon: Users, href: "/dashboard/customers" },
                    { label: "Conversion Rate", value: "4.2%", trend: "+0.8%", icon: Zap, href: "/dashboard/economics" },
                    { label: "Avg. Duration", value: "3m 42s", trend: "-5.2%", icon: MousePointer2, href: "/dashboard/deployments" },
                    { label: "Bounce Rate", value: "28.4%", trend: "+2.1%", icon: Activity, href: "/dashboard/guardian" },
                ].map((stat, i) => (
                    <Link key={stat.label} href={stat.href}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-zinc-900 p-6 lg:p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm group hover:border-primary-brand/30 transition-all relative overflow-hidden h-full"
                        >
                            <div className="relative z-10">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-primary-brand transition-colors mb-6 border border-zinc-100 dark:border-zinc-700">
                                    <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                                </div>
                                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1 truncate">{stat.label}</p>
                                <div className="flex items-end justify-between">
                                    <p className="text-xl lg:text-2xl font-black tracking-tight">{stat.value}</p>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 lg:gap-10">
                {/* Traffic Flow Chart - Adaptive and Resilient */}
                <div className="2xl:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 shadow-sm min-h-[400px] lg:h-[500px] flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 text-center sm:text-left">
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Traffic Intensity</h3>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1">Aggregated Distribution</p>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/10 w-fit mx-auto sm:mx-0">
                            <Sparkles className="w-3.5 h-3.5" /> AI Prophecy Bound
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 w-full overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8106D1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#8106D1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                    width={30}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '12px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#8106D1"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources - Stacks elegantly */}
                <div className="2xl:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 shadow-sm flex flex-col justify-between min-h-[400px]">
                    <div>
                        <h3 className="text-xl font-black tracking-tight mb-8">Acquisition</h3>
                        <div className="space-y-6 lg:space-y-8">
                            {trafficSourceData.map((source, i) => (
                                <Link
                                    key={i}
                                    href={
                                        source.name === 'Direct' ? '/dashboard/sites' :
                                            source.name === 'Social' ? '/dashboard/customers' :
                                                source.name === 'Organic' ? '/nexus' : '/dashboard/deployments'
                                    }
                                    className="block group/source cursor-pointer"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover/source:text-primary-brand transition-colors">
                                            <span className="truncate">{source.name}</span>
                                            <span className="text-zinc-900 dark:text-white shrink-0">{source.value}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${source.value}%` }}
                                                transition={{ duration: 1.5, delay: i * 0.1 }}
                                                style={{ backgroundColor: source.color }}
                                                className="h-full rounded-full"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/dashboard/economics">
                        <div className="mt-10 p-6 bg-zinc-50 dark:bg-zinc-800/80 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-700 relative overflow-hidden group cursor-pointer hover:border-primary-brand/30 transition-all">
                            <div className="flex items-start gap-4 relative z-10">
                                <TrendingUp className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1">Recommendation</p>
                                    <p className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 leading-relaxed">Boost social ad spend in APAC regions to exploit high-ROI anomalies Detected.</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
                <GlobalHeatmap />

                {/* Conversion Funnel - Elastic Precision */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-10 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col min-h-[450px]">
                    <div className="mb-10">
                        <h3 className="text-xl font-black tracking-tight">Conversion Funnel</h3>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1">Sovereign Journey Analysis</p>
                    </div>
                    <div className="space-y-3 lg:space-y-4 flex-1">
                        {[
                            { step: "Awareness", users: "125k", width: "100%", opacity: "bg-zinc-100 dark:bg-zinc-800" },
                            { step: "Interest", users: "42k", width: "80%", opacity: "bg-indigo-100 dark:bg-indigo-900/40" },
                            { step: "Consideration", users: "12k", width: "60%", opacity: "bg-indigo-200 dark:bg-indigo-800/40" },
                            { step: "Action", users: "3.4k", width: "40%", opacity: "bg-primary-brand/30 dark:bg-primary-brand/50" },
                        ].map((item, i) => (
                            <Link key={i} href="/dashboard/customers" className="relative group h-14 lg:h-16 block">
                                <div className={`h-full w-full rounded-2xl border border-zinc-100 dark:border-zinc-800 ${item.opacity} overflow-hidden transition-all group-hover:ring-1 group-hover:ring-primary-brand/30 shadow-sm`}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: item.width }}
                                        transition={{ duration: 1.2, delay: i * 0.2 }}
                                        className="h-full bg-primary-brand/5 border-r border-primary-brand/10"
                                    />
                                </div>
                                <div className="absolute inset-x-0 inset-y-0 flex items-center justify-between px-6 lg:px-8 pointer-events-none">
                                    <span className="text-[10px] font-black uppercase tracking-widest truncate mr-4">{item.step}</span>
                                    <span className="text-xs lg:text-sm font-black shrink-0">{item.users}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
