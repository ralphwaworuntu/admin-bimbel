"use client";

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, BarChart, Bar
} from 'recharts';
import {
    Activity, Users, MousePointer2, Globe, Clock,
    TrendingUp, ArrowUpRight, ShieldCheck, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const data = [
    { name: 'Mon', hits: 400, leads: 24, uptime: 99.9 },
    { name: 'Tue', hits: 300, leads: 13, uptime: 100 },
    { name: 'Wed', hits: 600, leads: 42, uptime: 99.8 },
    { name: 'Thu', hits: 800, leads: 51, uptime: 100 },
    { name: 'Fri', hits: 500, leads: 32, uptime: 100 },
    { name: 'Sat', hits: 900, leads: 65, uptime: 99.9 },
    { name: 'Sun', hits: 1100, leads: 82, uptime: 100 },
];

export function SiteIntelligence() {
    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Hits", value: "4,281", change: "+12%", icon: MousePointer2, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Conversion", value: "3.2%", change: "+0.4%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Avg Uptime", value: "99.98%", change: "Stable", icon: Activity, color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    { label: "Server Speed", value: "420ms", change: "-50ms", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                                {stat.change} <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Engagement Chart */}
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="font-black text-xl tracking-tight">Traffic Velocity</h3>
                            <p className="text-xs font-medium text-slate-400">Total hits across the global edge network</p>
                        </div>
                        <select className="bg-slate-50 dark:bg-slate-800 border-none text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-2 cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorHits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8106d1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#8106d1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 20px 50px -10px rgba(0,0,0,0.1)',
                                        fontSize: '12px',
                                        fontWeight: 800
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="hits"
                                    stroke="#8106d1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorHits)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Leads Performance */}
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="font-black text-xl tracking-tight">Lead Conversion</h3>
                            <p className="text-xs font-medium text-slate-400">Active form submissions and inquiries</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <span className="material-icons text-emerald-500 text-sm">rocket_launch</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc', radius: 10 }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', fontWeight: 800 }}
                                />
                                <Bar
                                    dataKey="leads"
                                    fill="#10b981"
                                    radius={[10, 10, 0, 0]}
                                    barSize={24}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Security & Infrastructure Status */}
            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <ShieldCheck className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="font-black text-lg">Infrastructure Health: Optimal</h4>
                            <p className="text-sm text-slate-400 font-medium">SSL Certificate is valid (Auto-renewed 2 days ago)</p>
                            <div className="flex gap-4 mt-3">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                    DDoS Protection Active
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400">
                                    <Globe className="w-3 h-3" />
                                    Global Edge Propagation: 100%
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="/dashboard/deployments">
                        <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                            View System Logs
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
