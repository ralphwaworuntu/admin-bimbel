"use client";

import { motion } from "framer-motion";
import {
    Activity,
    Zap,
    Globe,
    Cpu,
    Database,
    Server,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    Shield,
    BarChart3,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts";

const LOAD_DATA = [
    { time: '00:00', cpu: 25, ram: 45, net: 12 },
    { time: '04:00', cpu: 32, ram: 48, net: 18 },
    { time: '08:00', cpu: 45, ram: 52, net: 65 },
    { time: '12:00', cpu: 58, ram: 65, net: 82 },
    { time: '16:00', cpu: 52, ram: 62, net: 71 },
    { time: '20:00', cpu: 38, ram: 55, net: 42 },
    { time: '23:59', cpu: 30, ram: 49, net: 25 },
];

const DISTRIBUTION_DATA = [
    { name: 'North America', sites: 124, status: 'Optimal' },
    { name: 'Europe', sites: 86, status: 'Heavy' },
    { name: 'Asia Pacific', sites: 52, status: 'Optimal' },
    { name: 'Other Regions', sites: 18, status: 'Stable' },
];

export default function AdminAnalyticsPage() {
    return (
        <div className="space-y-10 pb-32">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/admin">
                        <button className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-amber-500 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight mb-2">Analytics Pulse</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Nexus Lattice Observability & Resource Flow
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">Real-time Stream Active</span>
                </div>
            </header>

            {/* Top Grid: Health Lattice */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Request Lattice", value: "1.2M", sub: "+12.4%", trend: "up", icon: Zap, color: "text-amber-500" },
                    { label: "Data Throughput", value: "84.2 GB", sub: "-2.1%", trend: "down", icon: Database, color: "text-blue-500" },
                    { label: "Success Rate", value: "99.98%", sub: "Stable", trend: "up", icon: Shield, color: "text-emerald-500" },
                    { label: "Active Nodes", value: "12/12", sub: "Operational", trend: "up", icon: Server, color: "text-purple-500" },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm space-y-4 hover:scale-[1.02] transition-all cursor-pointer group"
                    >
                        <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.sub}
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-black tracking-tighter">{stat.value}</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Node Resource Monitor */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-10 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">Node Resource Pulse</h3>
                    </div>
                    <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                    </select>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={LOAD_DATA}>
                            <defs>
                                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" strokeOpacity={0.1} />
                            <XAxis
                                dataKey="time"
                                fontSize={10}
                                fontWeight={900}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#888888' }}
                                dy={10}
                            />
                            <YAxis
                                fontSize={10}
                                fontWeight={900}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#888888' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#020617',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '1rem',
                                    fontSize: '10px',
                                    fontWeight: 900
                                }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="cpu"
                                stroke="#f59e0b"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorCpu)"
                                name="CPU Load %"
                            />
                            <Area
                                type="monotone"
                                dataKey="ram"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRam)"
                                name="RAM Usage %"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Distribution Pulse */}
                <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-10 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                            <Globe className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">Lattice Distribution</h3>
                    </div>

                    <div className="space-y-6">
                        {DISTRIBUTION_DATA.map((region) => (
                            <div key={region.name} className="space-y-3">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>{region.name}</span>
                                    <span className={region.status === 'Optimal' ? 'text-emerald-500' : 'text-amber-500'}>{region.status}</span>
                                </div>
                                <div className="h-3 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(region.sites / 150) * 100}%` }}
                                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                                    />
                                </div>
                                <p className="text-[10px] font-black">{region.sites} Units Deployment</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Efficiency Index */}
                <section className="bg-slate-950 rounded-[2.5rem] border border-white/5 p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-all">
                        <TrendingUp className="w-32 h-32 text-purple-600" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight text-white">Efficiency Algorithm</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Platform Power Index</p>
                                <h4 className="text-4xl font-black text-white">94.8</h4>
                                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mt-2 italic">Hyper-Scale Ready</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-[8px] font-black uppercase text-slate-500 mb-2">Cold Storage Flow</p>
                                    <p className="text-sm font-black text-white">12.4 GB/s</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-[8px] font-black uppercase text-slate-500 mb-2">Sync Latency</p>
                                    <p className="text-sm font-black text-white">18ms</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
