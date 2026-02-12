"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Network, Globe, Radio, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export function PropagationPulse() {
    const [activeNodes, setActiveNodes] = useState(0);
    const totalNodes = 312;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNodes(prev => {
                if (prev >= totalNodes) {
                    clearInterval(interval);
                    return totalNodes;
                }
                return prev + Math.floor(Math.random() * 10) + 5;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const nodes = [
        { top: "20%", left: "30%" },
        { top: "40%", left: "70%" },
        { top: "60%", left: "40%" },
        { top: "30%", left: "50%" },
        { top: "70%", left: "20%" },
        { top: "15%", left: "80%" },
        { top: "80%", left: "60%" },
        { top: "50%", left: "10%" },
    ];

    return (
        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8106d1_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-brand mb-2">Edge Propagation</p>
                        <h3 className="text-2xl font-black tracking-tight">Global Pulse</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-emerald-400">{Math.min(activeNodes, totalNodes)}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nodes Active</p>
                    </div>
                </div>

                <div className="relative aspect-video bg-black/40 rounded-3xl border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Globe className="w-48 h-48 stroke-[0.5] text-primary-brand animate-pulse" />
                    </div>

                    {nodes.map((node, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: activeNodes > (i * 40) ? 1 : 0,
                                opacity: activeNodes > (i * 40) ? 1 : 0
                            }}
                            className="absolute"
                            style={{ top: node.top, left: node.left }}
                        >
                            <div className="w-2 h-2 bg-emerald-500 rounded-full relative">
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-40"></div>
                            </div>
                        </motion.div>
                    ))}

                    <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary-brand"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(activeNodes / totalNodes) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <Radio className="w-5 h-5 text-primary-brand animate-pulse" />
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Latency</p>
                            <p className="text-xs font-bold">28ms Avg</p>
                        </div>
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Health</p>
                            <p className="text-xs font-bold">Optimal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
