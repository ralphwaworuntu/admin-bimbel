"use client";

import { motion } from "framer-motion";
import {
    Settings,
    Shield,
    Zap,
    Globe,
    Terminal,
    Server,
    Key,
    Database,
    Activity,
    Lock,
    RefreshCw,
    AlertTriangle,
    ChevronRight
} from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-10 pb-32">
            <header>
                <h1 className="text-3xl font-black tracking-tight mb-2">Nexus Control</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Platform Sovereignty & Infrastructure Protocols
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Platform Config */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-10 space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                                <Server className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Core Infrastructure</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Instance Name</label>
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-transparent focus-within:border-purple-600/20 transition-all font-bold text-sm">
                                    EngineAI Primary Nexus
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Environment Domain</label>
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-transparent font-bold text-sm text-slate-400">
                                    waas-builder-v2.engine.ai
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Lattice Protocol</label>
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-transparent font-bold text-sm">
                                    SOVEREIGN-L7-PROXIED
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Database Shard</label>
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-transparent font-bold text-sm">
                                    MYSQL-PROD-01 (Active)
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50 dark:border-white/5">
                            <button className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all">
                                Commit Sync
                            </button>
                        </div>
                    </section>

                    {/* Operational Logs */}
                    <section className="bg-slate-950 rounded-[2.5rem] border border-white/5 p-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight text-white">Live Node Analytics</h3>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">Streaming</span>
                            </div>
                        </div>

                        <div className="font-mono text-[10px] space-y-2 text-slate-400 max-h-[300px] overflow-y-auto custom-scrollbar">
                            <p className="text-emerald-500/60">[INFRA] Edge-Nexus connected: Node-SG-Primary (10.0.4.12)</p>
                            <p className="text-slate-500">{"12:21:05"} {"->"} Ingress scrubbed via L7 Aegis Fire (42req/s)</p>
                            <p className="text-blue-400/60">[SYNC] Sovereign manifest synchronized across 12 region buckets</p>
                            <p className="text-slate-500">{"12:21:08"} {"->"} Database heartbeat verified (MySQL-01) in 4ms</p>
                            <p className="text-purple-400/60">[AUTH] New administrative session initialized (admin@demo.com)</p>
                            <p className="text-slate-500">{"12:21:12"} {"->"} Site rebuild triggered: 'Quantum Portal' #921</p>
                            <p className="text-slate-600 opacity-50">[DEBUG] Cache purge initiated for asset lattice 'main'</p>
                            <div className="w-2 h-0.5 bg-amber-500 animate-pulse mt-4" />
                        </div>
                    </section>
                </div>

                {/* Sidebar Stats/Quick Actions */}
                <div className="space-y-8">
                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8 space-y-6">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Platform Health</h4>
                        <div className="space-y-6">
                            {[
                                { label: "Lattice Uptime", value: "99.99%", color: "text-emerald-500", icon: Activity },
                                { label: "Aegis Protection", value: "ENABLED", color: "text-blue-500", icon: Shield },
                                { label: "Edge Propagation", value: "12ms", color: "text-purple-500", icon: Zap },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-4 h-4 text-slate-400" />
                                        <span className="text-xs font-black">{item.label}</span>
                                    </div>
                                    <span className={`text-xs font-black ${item.color}`}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-red-500/5 rounded-[2.5rem] border border-red-500/10 p-8 space-y-6">
                        <div className="flex items-center gap-3 text-red-500">
                            <AlertTriangle className="w-5 h-5" />
                            <h4 className="text-sm font-black uppercase tracking-widest">Platform Safety</h4>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                            Executive operations with potential lattice instability. Handle with precision.
                        </p>
                        <div className="space-y-3">
                            <button className="w-full py-4 px-6 rounded-2xl bg-white dark:bg-slate-800 border border-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white transition-all text-left flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                    Purge Global Cache
                                </div>
                                <ChevronRight className="w-3 h-3" />
                            </button>
                            <button className="w-full py-4 px-6 rounded-2xl bg-white dark:bg-slate-800 border border-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white transition-all text-left flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <Lock className="w-4 h-4" />
                                    Maintenance Orbit
                                </div>
                                <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
