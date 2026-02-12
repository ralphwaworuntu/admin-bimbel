"use client";

import { motion } from "framer-motion";
import { Globe, Users, Zap } from "lucide-react";
import Link from "next/link";

export function GlobalTrafficPulse() {
    const pulses = [
        { top: "30%", left: "20%", delay: 0 },
        { top: "45%", left: "75%", delay: 1.2 },
        { top: "60%", left: "40%", delay: 0.8 },
        { top: "25%", left: "85%", delay: 2.1 },
        { top: "70%", left: "15%", delay: 1.5 },
        { top: "40%", left: "45%", delay: 0.5 },
        { top: "55%", left: "80%", delay: 2.5 },
        { top: "35%", left: "60%", delay: 1.8 },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden h-full min-h-[400px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
                <div className="min-w-0">
                    <h3 className="text-xl font-black truncate">Global Traffic Pulse</h3>
                    <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 truncate">Real-time edge activity</p>
                </div>
                <Link href="/dashboard/customers" className="flex -space-x-2 shrink-0 hover:scale-105 transition-transform">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 overflow-hidden shadow-sm">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-primary-brand text-[8px] font-black text-white flex items-center justify-center">
                        +12
                    </div>
                </Link>
            </div>

            <div className="relative aspect-[2/1] bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-center overflow-hidden">
                <Globe className="w-48 h-48 text-slate-200 dark:text-slate-800 absolute opacity-50" />

                {pulses.map((pulse, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3"
                        style={{ top: pulse.top, left: pulse.left }}
                    >
                        <div className="w-full h-full bg-primary-brand rounded-full relative">
                            <motion.div
                                animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: pulse.delay }}
                                className="absolute inset-0 bg-primary-brand rounded-full"
                            />
                        </div>
                    </motion.div>
                ))}

                <div className="absolute bottom-4 left-4 flex items-center gap-4">
                    <div className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                        <Users className="w-3 h-3 text-primary-brand" />
                        <span className="text-[10px] font-black">2.4k Active</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 lg:gap-4">
                <Link href="/dashboard/economics" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex items-center gap-3 min-w-0 hover:border-primary-brand/30 transition-all">
                    <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">Growth</p>
                        <p className="text-xs lg:text-sm font-black">+18%</p>
                    </div>
                </Link>
                <Link href="/dashboard/guardian" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex items-center gap-3 min-w-0 hover:border-primary-brand/30 transition-all">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center shrink-0">
                        <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                    <div className="min-w-0">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">Edge Status</p>
                        <p className="text-xs lg:text-sm font-black truncate">Stable</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
