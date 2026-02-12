"use client";
import Link from "next/link";
import { Zap, ArrowLeft, Network, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function NexusPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-8 overflow-hidden">
            {/* Background Pulse */}
            <div className="absolute inset-0 bg-primary-brand/5 blur-[150px] animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center text-center space-y-8"
            >
                <div className="w-24 h-24 rounded-[2.5rem] bg-primary-brand flex items-center justify-center shadow-[0_0_50px_rgba(129,6,209,0.5)]">
                    <Network className="w-12 h-12 text-white" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-6xl font-black tracking-tight italic">NEXUS<span className="text-primary-brand">.STREAM</span></h1>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">The Central Intelligence Hub</p>
                </div>

                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl text-left flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary-brand mb-4">Strategic Insight</p>
                            <p className="text-xl font-black mb-4">The Nexus is currently synchronizing global nodes.</p>
                            <p className="text-slate-400 font-medium leading-relaxed mb-8">
                                Cross-ecosystem orchestration will be available in the next infrastructure update. Monitor your terminals in the meantime.
                            </p>
                        </div>
                        <Link href="/dashboard" className="w-fit px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2">
                            <ArrowLeft className="w-3 h-3" /> Return to Terminal
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <Link href="/dashboard/guardian" className="block group">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl hover:bg-white/[0.08] transition-all flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black">Security Protocol v5</p>
                                        <p className="text-[10px] text-slate-500 font-bold">Inspect Threat Matrix</p>
                                    </div>
                                </div>
                                <Zap className="w-4 h-4 text-primary-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>

                        <Link href="/dashboard/deployments" className="block group">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl hover:bg-white/[0.08] transition-all flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                                        <Network className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black">Edge Sync Latency</p>
                                        <p className="text-[10px] text-slate-500 font-bold">Optimize Global Mesh</p>
                                    </div>
                                </div>
                                <Zap className="w-4 h-4 text-primary-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>
                    </div>
                </div>
            </motion.div>

            <div className="absolute bottom-12 text-center">
                <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.6em]">System Version 0.9.4 • Sync Status: Active</p>
            </div>
        </div>
    );
}
