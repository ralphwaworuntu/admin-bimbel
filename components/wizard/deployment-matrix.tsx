"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Check, Loader2, Globe, Shield, Zap, Server } from "lucide-react";
import { useWizard } from "./wizard-context";

export function DeploymentMatrix({ onComplete }: { onComplete: () => void }) {
    const { config } = useWizard();
    const LOG_MESSAGES = [
        { text: `Initializing Sovereign Orchestration for ${config.identity.brandName || 'Sovereign Node'}...`, type: "info" },
        { text: "Connecting to Global Edge Network...", type: "info" },
        { text: "Provisioning dynamic compute nodes in Singapore-01...", type: "process" },
        { text: "Node cluster verified. Health: 100%", type: "success" },
        { text: "Allocating distributed storage shards...", type: "process" },
        { text: "Generating Lexical SSL Certificates...", type: "info" },
        { text: "SSL propagation started (Global RSA 4096)...", type: "success" },
        { text: "Injecting brand identity tokens...", type: "info" },
        { text: "Optimizing asset pipeline for ultra-low latency...", type: "process" },
        { text: "CDN Warmup: 240/240 Edge locations active", type: "success" },
        { text: "Registering sovereign subdomain structure...", type: "process" },
        { text: "DNS Propagation: Handshake successful.", type: "success" },
        { text: "Applying Cognitive Personalization layers...", type: "info" },
        { text: "Final integrity sweep...", type: "process" },
        { text: "System Online. Site is ready for traffic.", type: "success" },
    ];
    const [lines, setLines] = useState<typeof LOG_MESSAGES>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentIndex < LOG_MESSAGES.length) {
            const timer = setTimeout(() => {
                setLines(prev => [...prev, LOG_MESSAGES[currentIndex]]);
                setCurrentIndex(prev => prev + 1);
            }, 150 + Math.random() * 400);
            return () => clearTimeout(timer);
        } else {
            const finalTimer = setTimeout(onComplete, 1500);
            return () => clearTimeout(finalTimer);
        }
    }, [currentIndex, onComplete, LOG_MESSAGES]); // Added LOG_MESSAGES to dependencies

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center p-6 sm:p-12 overflow-hidden selection:bg-primary-brand/30">
            {/* Background Grid & Glows */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-brand/10 blur-[150px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full max-w-3xl aspect-[16/10] bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative"
            >
                {/* Terminal Header */}
                <div className="h-14 border-b border-white/10 bg-white/5 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                        </div>
                        <div className="h-4 w-px bg-white/10 mx-2"></div>
                        <div className="flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Launch Sequence // Sovereign Engine</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Orchestrating</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                </div>

                {/* Terminal Body */}
                <div
                    ref={scrollRef}
                    className="flex-1 p-8 overflow-y-auto custom-scrollbar font-mono text-[11px] leading-relaxed space-y-2 scroll-smooth"
                >
                    <AnimatePresence mode="popLayout">
                        {lines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-slate-600 shrink-0 select-none">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                <span className={
                                    line.type === 'success' ? 'text-emerald-400 font-bold' :
                                        line.type === 'process' ? 'text-blue-400' :
                                            'text-slate-300'
                                }>
                                    {line.type === 'success' && <Check className="inline-block w-3 h-3 mr-2 -mt-0.5" />}
                                    {line.type === 'process' && <Loader2 className="inline-block w-3 h-3 mr-2 -mt-0.5 animate-spin" />}
                                    {line.text}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Footer Progress */}
                <div className="h-20 border-t border-white/10 bg-white/5 p-6 space-y-3 shrink-0">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <div className="flex gap-6">
                            <span className="flex items-center gap-2"><Server className="w-3 h-3" /> Node-SG01</span>
                            <span className="flex items-center gap-2 text-primary-brand"><Globe className="w-3 h-3" /> Global CDN</span>
                        </div>
                        <span>Progression: {Math.round((currentIndex / LOG_MESSAGES.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentIndex / LOG_MESSAGES.length) * 100}%` }}
                            className="h-full bg-primary-brand shadow-[0_0_15px_rgba(var(--color-primary-brand-rgb),0.5)]"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
