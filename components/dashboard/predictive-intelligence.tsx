"use client";

import { motion } from "framer-motion";
import { TrendingUp, Sparkles, BrainCircuit, ArrowUpRight, Target } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Link from "next/link";

const forecastData = [
    { name: "Week 1", growth: 100, projection: 120 },
    { name: "Week 2", growth: 140, projection: 190 },
    { name: "Week 3", growth: 190, projection: 280 },
    { name: "Week 4", growth: 260, projection: 410 },
    { name: "Week 5", growth: 380, projection: 650 },
];

export function PredictiveIntelligence() {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col h-full min-h-[450px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BrainCircuit className="w-32 h-32 text-primary-brand" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black">Ecosystem Intelligence</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Autonomous Scaling Matrix</p>
                    </div>
                </div>
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-primary-brand" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Sovereign v3.0</span>
                </div>
            </div>

            <div className="flex-1 min-h-[200px] mb-8 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData}>
                        <defs>
                            <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8106D1" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#8106D1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: 800, fill: '#94A3B8' }}
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            itemStyle={{ fontWeight: 900, fontSize: '12px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="growth"
                            stroke="#CBD5E1"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fill="transparent"
                        />
                        <Area
                            type="monotone"
                            dataKey="projection"
                            stroke="#8106D1"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorProjection)"
                            animationDuration={4000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 gap-4 relative z-10">
                <div className="p-5 rounded-3xl bg-primary-brand/5 border border-primary-brand/10 hover:border-primary-brand/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary-brand" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Autonomous Opportunity</p>
                        </div>
                        <span className="text-[9px] font-black bg-primary-brand text-white px-2 py-0.5 rounded-full uppercase">High Impact</span>
                    </div>
                    <p className="text-sm font-black text-slate-900 dark:text-white leading-relaxed">
                        Japan-01 nodes showing <span className="text-primary-brand">42% higher retention</span>. Suggesting global roll-out of Elite Palette Matrix v4.
                    </p>
                </div>
            </div>
        </div>
    );
}
