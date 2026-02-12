"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, RefreshCcw, Activity, CheckCircle2, Search, Cpu, X, Lock, Terminal, Globe } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function GuardianConsole() {
    const [logs, setLogs] = useState([
        { id: 1, type: "optimization", message: "Image 'hero-v2.webp' compressed by 82%", time: "Just now", status: "success", detail: "Global edge propagation complete. Origin: SF-1. Efficiency Gain: 120ms LCP improvement." },
        { id: 2, type: "security", message: "Edge firewall rules updated for 12 nodes", time: "2m ago", status: "success", detail: "L7 filtering rules synchronized across all active nodes in the Nexus Lattice. Threat vectors neutralized." },
        { id: 3, type: "performance", message: "CSS critial path extraction completed", time: "5m ago", status: "success", detail: "Critical-CSS injected into 4 index head templates. Unused CSS purged (45kb saved)." },
    ]);
    const [selectedLog, setSelectedLog] = useState<any>(null);

    const logPool = [
        "SEO Meta-tags optimized for high-intent keywords",
        "Lazy loading injected into 12 images",
        "Server-side cache invalidated for global edge",
        "DNS propagation verified across 42 regions",
        "Minified 15.2kb of redundant JavaScript",
        "Autonomous security patch applied to Node.js runtime",
        "Synthesized new alt-text for accessibility compliance",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const log = {
                id: Date.now(),
                type: Math.random() > 0.5 ? "optimization" : "security",
                message: logPool[Math.floor(Math.random() * logPool.length)],
                time: "Just now",
                status: "success",
                detail: "Autonomous orchestration completed. System health remains optimal at 100% stability."
            };
            setLogs(prev => [log, ...prev.slice(0, 5)]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#8106d120,transparent)]"></div>

            <div className="p-6 lg:p-8 relative z-10 flex flex-col h-full min-h-[450px]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-primary-brand/20 flex items-center justify-center text-primary-brand border border-primary-brand/20 shadow-[0_0_20px_rgba(129,6,209,0.2)]">
                            <Shield className="w-5 h-5 lg:w-6 lg:h-6 animate-pulse" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-white font-black text-lg lg:text-xl tracking-tight truncate">Guardian Console</h3>
                            <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 truncate">Autonomous Self-Healing</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Active Guard</span>
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                onClick={() => setSelectedLog(log)}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group/log"
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${log.type === 'security' ? 'bg-indigo-500/20 text-indigo-400 group-hover/log:bg-indigo-500/40' : 'bg-amber-500/20 text-amber-400 group-hover/log:bg-amber-500/40'}`}>
                                    {log.type === 'security' ? <Lock className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{log.type}</p>
                                        <p className="text-[10px] font-bold text-slate-600">{log.time}</p>
                                    </div>
                                    <p className="text-xs font-bold text-slate-300 leading-tight">{log.message}</p>
                                </div>
                                <CheckCircle2 className="w-4 h-4 text-emerald-500/40 group-hover/log:text-emerald-500 transition-colors" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Efficiency</p>
                        <p className="text-xl lg:text-2xl font-black text-white">+34.2%</p>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Core Status</p>
                        <div className="flex items-center justify-end gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <p className="text-[10px] font-black text-white uppercase italic">Optimal</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Log Trace Analysis Portal */}
            <AnimatePresence>
                {selectedLog && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedLog(null)}
                            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100] cursor-default"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#020617] border-l border-white/10 z-[101] flex flex-col shadow-[-30px_0_100px_rgba(0,0,0,0.5)]"
                        >
                            <div className="p-8 border-b border-white/10 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedLog.type === 'security' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                        {selectedLog.type === 'security' ? <Shield className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h2 className="text-white text-xl font-black tracking-tight uppercase">Sovereign Trace</h2>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Event ID: #{selectedLog.id.toString().slice(-6)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedLog(null)}
                                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-brand flex items-center gap-2">
                                        <Activity className="w-3 h-3" /> Event Narrative
                                    </h3>
                                    <p className="text-base text-slate-200 font-bold leading-relaxed">{selectedLog.message}</p>
                                    <p className="text-xs text-slate-400 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">{selectedLog.detail}</p>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                        <Terminal className="w-3 h-3" /> Technical Telemetry
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Radius</p>
                                            <p className="text-xs font-black text-white">Global Edge</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Latency Delta</p>
                                            <p className="text-xs font-black text-emerald-500">-12.4ms</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Auth Level</p>
                                            <p className="text-xs font-black text-white">L4 Administrative</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Node ID</p>
                                            <p className="text-xs font-black text-white">SG-CH-04</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> Autonomous Resolution
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 text-slate-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                            <p className="text-[10px] font-bold">Threat vectors isolated via L7 Firewall ruleset.</p>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-400 text-xs line-through opacity-50">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0"></div>
                                            <p className="text-[10px] font-bold">Manual operator intervention required.</p>
                                        </div>
                                        <div className="flex items-center gap-4 text-emerald-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></div>
                                            <p className="text-[10px] font-bold italic">System self-healed in 412ms.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-white/10 flex gap-4">
                                <Link href="/nexus" className="flex-1 bg-white text-slate-950 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all text-center">Export Trace</Link>
                                <Link href="/dashboard/guardian" className="flex-1 bg-indigo-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all text-center">Verify Node</Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

