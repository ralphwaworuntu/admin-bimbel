"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    ShieldAlert,
    ShieldCheck,
    Zap,
    Terminal,
    Eye,
    Activity,
    Lock,
    Unlock,
    Radar,
    ChevronRight,
    Search
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const threats = [
    { id: 1, type: "DDOS_SURGE", source: "192.168.1.105 (Moscow)", intensity: "High", status: "Mitigating", timestamp: "12:45:02" },
    { id: 2, type: "GEO_ANOMALY", source: "Bot_Cluster_Alpha (VPC-East)", intensity: "Medium", status: "Quarantined", timestamp: "12:44:55" },
    { id: 3, type: "AUTH_BRUTE", source: "84.24.11.9 (Hong Kong)", intensity: "Low", status: "Blocked", timestamp: "12:44:30" },
    { id: 4, type: "SQL_INJECTION", source: "Anonymous_Proxy (Toronto)", intensity: "Critical", status: "Mitigated", timestamp: "12:43:12" },
];

export default function GuardianPage() {
    return (
        <div className="space-y-8 lg:space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="min-w-0">
                    <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2 truncate">Guardian Terminal</h1>
                    <div className="text-slate-500 font-bold flex flex-wrap items-center gap-2">
                        <span className="truncate">Platform defense orchestration.</span>
                        <Link href="/dashboard/deployments" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
                            <ShieldCheck className="w-3 h-3" /> Shield v5.2 Active
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    <div className="flex flex-col items-end text-right">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Integrity</span>
                        <span className="text-xl font-black text-emerald-500">99.98%</span>
                    </div>
                    <button className="bg-slate-950 text-white px-5 py-3.5 rounded-2xl text-[10px] font-black shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-3">
                        <Radar className="w-4 h-4 animate-pulse" /> Scan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10">
                {/* Shield Lattice Visualization - Resilience Optimization */}
                <div className="xl:col-span-2 bg-slate-950 border border-white/10 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 shadow-2xl relative overflow-hidden min-h-[400px] lg:h-[600px] flex flex-col justify-center items-center">
                    <div className="absolute top-6 left-6 lg:top-10 lg:left-10 flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Lattice Optimal</span>
                    </div>

                    <div className="relative scale-[0.65] sm:scale-[0.85] lg:scale-100 transition-transform duration-700">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-primary-brand/30 flex items-center justify-center p-8"
                        >
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full rounded-full border border-primary-brand/50 flex items-center justify-center p-8 sm:p-10"
                            >
                                <div className="w-full h-full rounded-full bg-primary-brand/5 backdrop-blur-3xl border border-primary-brand/20 flex items-center justify-center text-primary-brand group cursor-help">
                                    <Shield className="w-16 h-16 sm:w-24 sm:h-24 fill-primary-brand/10 transition-transform group-hover:scale-110" />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Orbiting Resilient Nodes */}
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${deg}deg) translateY(-140px)`,
                                }}
                                className="sm:hidden"
                            >
                                <div className="w-2.5 h-2.5 rounded-full bg-primary-brand shadow-[0_0_15px_rgba(129,6,209,0.8)]"></div>
                            </motion.div>
                        ))}
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                            <motion.div
                                key={`lg-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${deg}deg) translateY(-180px)`,
                                }}
                                className="hidden sm:block"
                            >
                                <div className="w-3.5 h-3.5 rounded-full bg-primary-brand shadow-[0_0_15px_rgba(129,6,209,0.8)]"></div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 lg:mt-12 text-center px-6 relative z-10">
                        <h3 className="text-xl font-black text-white mb-2 tracking-tight">Autonomous Hardening Active</h3>
                        <p className="text-[10px] lg:text-xs text-slate-500 font-bold max-w-sm mx-auto leading-relaxed">
                            Securing 42 global endpoints. Monitoring 1.2M events/sec. Node health 100%.
                        </p>
                    </div>

                    {/* Elastic Atmosphere */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,6,209,0.1),transparent_70%)] pointer-events-none"></div>
                </div>

                {/* Threat Intelligence Stream - Flexible and Elastic */}
                <div className="xl:col-span-1 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/10 rounded-[2.2rem] lg:rounded-[3rem] p-6 lg:p-10 shadow-sm flex flex-col min-h-[400px] lg:h-[600px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg lg:text-xl font-black tracking-tight">Intelligence</h3>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Real-time Stream</p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/10">
                            <Activity className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar min-h-0">
                        {threats.map((threat) => (
                            <div key={threat.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group hover:ring-2 hover:ring-rose-500/20 transition-all cursor-crosshair">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${threat.intensity === 'Critical' ? 'bg-rose-500 text-white shadow-[0_4px_10px_rgba(244,63,94,0.3)]' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>
                                        {threat.intensity}
                                    </span>
                                    <span className="text-[9px] font-bold text-slate-400 font-mono tracking-tighter">{threat.timestamp}</span>
                                </div>
                                <p className="text-xs font-black mb-1 truncate">{threat.type}</p>
                                <p className="text-[10px] font-bold text-slate-500 mb-4 truncate">{threat.source}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        {threat.status}
                                    </span>
                                    <Link href="/nexus">
                                        <button className="text-[9px] font-black uppercase text-primary-brand/80 hover:text-primary-brand transition-colors">Analyze</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href="/dashboard/settings/security">
                        <button className="mt-8 w-full py-4 bg-slate-100 dark:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-primary-brand transition-all">
                            Comprehensive Security Audit
                        </button>
                    </Link>
                </div>
            </div>

            {/* Defender Action Lattice - Stacking Resilience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 lg:gap-6">
                {[
                    { label: "AI Firewall", desc: "Adaptive L7 protection", icon: Shield, active: true },
                    { label: "IP Blacklist", desc: "Automated sanctions", icon: Lock, active: true },
                    { label: "Bunker Mode", desc: "Isolate endpoints", icon: Eye, active: false },
                    { label: "MFA Guard", desc: "Biometric enforcement", icon: Zap, active: true },
                ].map((action, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden flex flex-col justify-between min-h-[160px]">
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${action.active ? 'bg-primary-brand/10 text-primary-brand border-primary-brand/10' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700'}`}>
                                <action.icon className="w-6 h-6" />
                            </div>
                            <button className={`w-12 h-6 rounded-full p-1 transition-all flex items-center ${action.active ? 'bg-emerald-500 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'}`}>
                                <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-lg" />
                            </button>
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-sm font-black mb-1">{action.label}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{action.desc}</p>
                        </div>

                        <div className="absolute -right-6 -bottom-6 opacity-0 group-hover:opacity-[0.04] scale-75 group-hover:scale-125 transition-all duration-700 pointer-events-none">
                            <action.icon className="w-32 h-32" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
