"use client";

import { motion } from "framer-motion";
import {
    Users,
    Globe,
    Zap,
    Shield,
    Activity,
    Plus,
    ChevronRight,
    ArrowUpRight,
    Search,
    Settings,
    LayoutDashboard,
    Clock,
    UserPlus
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const chartData = [
    { name: "Mon", users: 4, sites: 2 },
    { name: "Tue", users: 7, sites: 3 },
    { name: "Wed", users: 5, sites: 1 },
    { name: "Thu", users: 9, sites: 5 },
    { name: "Fri", users: 12, sites: 6 },
    { name: "Sat", users: 8, sites: 4 },
    { name: "Sun", users: 15, sites: 7 },
];

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/admin/stats");
                const json = await res.json();
                setData(json);
            } catch (e) {
                console.error("Failed to fetch admin stats", e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStats();
    }, []);

    const stats = [
        {
            label: "Total Users",
            value: data?.stats?.totalUsers || "...",
            change: data?.stats?.growth || "+0%",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            label: "Active Sites",
            value: data?.stats?.totalSites || "...",
            change: "+5 this week",
            icon: Globe,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            label: "Active Sessions",
            value: data?.stats?.activeSessions || "1",
            change: "Live Now",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            label: "Sovereign Health",
            value: "99.9%",
            change: "Stable",
            icon: Shield,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
    ];

    return (
        <div className="space-y-8 lg:space-y-12 pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Platform Overview</h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Sovereign Infrastructure Control Center
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Systems Nominal</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shrink-0`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{stat.change}</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Manage Users", icon: Users, href: "/admin/users", color: "bg-blue-600" },
                    { label: "Site Directory", icon: Globe, href: "/admin/sites", color: "bg-purple-600" },
                    { label: "Analytics Pulse", icon: Activity, href: "/admin/analytics", color: "bg-amber-600" },
                    { label: "Platform Settings", icon: Settings, href: "/admin/settings", color: "bg-slate-700" },
                ].map((action, i) => (
                    <Link key={i} href={action.href}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-6 rounded-2xl ${action.color} text-white shadow-xl cursor-pointer flex flex-col gap-3 group`}
                        >
                            <action.icon className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{action.label}</span>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Platform Growth Chart */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                            <Activity className="w-5 h-5 text-purple-600" /> Platform Velocity
                        </h3>
                        <Link href="/admin/analytics">
                            <button className="px-4 py-2 rounded-xl bg-purple-600/10 text-purple-600 text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">
                                View Analysis
                            </button>
                        </Link>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8 h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888822" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#888' }}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        borderRadius: '16px',
                                        border: 'none',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                <Area type="monotone" dataKey="sites" stroke="#3b82f6" strokeWidth={3} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity Mini-Feed */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                        <Clock className="w-5 h-5 text-amber-500" /> Recent Activity
                    </h3>
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8 space-y-6">
                        {isLoading ? (
                            <div className="text-center py-12 text-slate-400 text-xs font-bold animate-pulse">Scanning Nexus...</div>
                        ) : (
                            <div className="space-y-6">
                                {data?.recentUsers?.map((user: any) => (
                                    <div key={user.id} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                            <UserPlus className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black truncate">{user.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">New Signup</p>
                                        </div>
                                    </div>
                                ))}
                                {data?.recentSites?.map((site: any) => (
                                    <div key={site.id} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black truncate">{site.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Site Created</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link href="/admin/users" className="block pt-4 border-t border-slate-100 dark:border-white/5">
                            <button className="w-full text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-colors flex items-center justify-center gap-2">
                                View Full Audit Log <ChevronRight className="w-3 h-3" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
