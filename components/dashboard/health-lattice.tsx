"use client";

import { Server, Database, Cpu, Globe, Zap, ShieldCheck, X, Activity, Radio, BarChart3 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function HealthLattice() {
    const nodes = [
        { id: 1, name: "US-EAST-1", type: "edge", status: "optimal", latency: "12ms", health: 100, traffic: "1.2M req/s", provider: "Sovereign Edge" },
        { id: 2, name: "EU-WEST-1", type: "edge", status: "optimal", latency: "18ms", health: 100, traffic: "890k req/s", provider: "Sovereign Edge" },
        { id: 3, name: "AP-SOUTH-1", type: "edge", status: "stable", latency: "42ms", health: 98, traffic: "450k req/s", provider: "Sovereign Edge" },
        { id: 4, name: "DB-CLUSTER-ALPHA", type: "storage", status: "optimal", latency: "2ms", health: 100, traffic: "12k iops", provider: "Nexus Storage" },
        { id: 5, name: "COMPUTE-MESH", type: "compute", status: "optimal", latency: "5ms", health: 100, traffic: "4.2 TFlops", provider: "Nexus Compute" },
    ];

    const [selectedNode, setSelectedNode] = useState<any>(null);

    return (
        <div className="bg-slate-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden h-full min-h-[400px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#1e293b,transparent)] opacity-50"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div>
                        <h3 className="text-white font-black text-lg lg:text-xl tracking-tight">Infrastructure Lattice</h3>
                        <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Autonomous Edge Health</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Global Sync Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nodes.map((node, i) => (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedNode(node)}
                            className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-primary-brand group-hover:bg-primary-brand/10 transition-colors">
                                {node.type === 'edge' ? <Globe className="w-5 h-5" /> :
                                    node.type === 'storage' ? <Database className="w-5 h-5" /> :
                                        <Cpu className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{node.name}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">{node.status}</span>
                                    <span className="text-[10px] font-black text-slate-600">{node.latency}</span>
                                </div>
                            </div>
                            <div className="w-1.5 h-6 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ height: ["20%", "80%", "60%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-full bg-primary-brand rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Uptime</span>
                            <span className="text-sm font-black text-white">99.999%</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Region Count</span>
                            <span className="text-sm font-black text-white">42 Nodes</span>
                        </div>
                    </div>
                    <div className="w-24 h-8 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Secure</span>
                    </div>
                </div>
            </div>

            {/* Node Diagnostic Portal */}
            <AnimatePresence>
                {selectedNode && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedNode(null)}
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
                                    <div className="w-12 h-12 rounded-xl bg-primary-brand/20 flex items-center justify-center text-primary-brand">
                                        <Activity className="w-6 h-6 animate-pulse" />
                                    </div>
                                    <div>
                                        <h2 className="text-white text-xl font-black tracking-tight uppercase">Lattice Diagnostic</h2>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{selectedNode.name} • {selectedNode.type}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedNode(null)}
                                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Health Index</p>
                                        <p className="text-2xl font-black text-emerald-500">{selectedNode.health}%</p>
                                    </div>
                                    <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">IO Throughput</p>
                                        <p className="text-2xl font-black text-white">{selectedNode.traffic}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                        <Radio className="w-3 h-3" /> Peer Topology
                                    </h3>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((peer) => (
                                            <div key={peer} className="flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                    <span className="text-xs font-bold text-slate-300">Nexus-Peer-0{peer}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-emerald-500">Active</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                        <BarChart3 className="w-3 h-3" /> Regional Telemetry
                                    </h3>
                                    <div className="p-6 rounded-3xl bg-slate-950 border border-white/5 font-mono text-[11px] space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Provider:</span>
                                            <span className="text-white">{selectedNode.provider}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Uptime:</span>
                                            <span className="text-white">522 days, 12:44:12</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Packet Loss:</span>
                                            <span className="text-emerald-500">0.000%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Peering Status:</span>
                                            <span className="text-blue-400">Stable (12 Peers)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-white/10 bg-white/2">
                                <Link href="/dashboard/guardian">
                                    <button className="w-full bg-primary-brand text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary-brand/20 hover:scale-[1.02] transition-all">
                                        Run Deep Diagnostic
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
