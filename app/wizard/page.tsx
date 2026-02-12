"use client";

import { Suspense, useState, useEffect } from "react";
import { WizardProvider } from "@/components/wizard/wizard-context";
import { WizardShell } from "@/components/wizard/wizard-shell";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Cpu, Terminal } from "lucide-react";

function StrategicLoader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const sequence = [
        "Analyzing market demographics...",
        "Calibrating neural design vectors...",
        "Initializing sovereign brand hub...",
        "Syncing global edge nodes...",
        "Ready for strategic deployment."
    ];

    useEffect(() => {
        let currentIdx = 0;
        const interval = setInterval(() => {
            if (currentIdx < sequence.length) {
                setLogs(prev => [...prev, `> ${sequence[currentIdx]}`]);
                setProgress(prev => Math.min(prev + 20, 100));
                currentIdx++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 800);
            }
        }, 700);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[200] overflow-hidden">
            {/* Background Hologram effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,6,209,0.15)_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg px-8"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary-brand p-3 rounded-2xl shadow-2xl shadow-primary-brand/30 animate-pulse">
                        <Zap className="text-white w-6 h-6 fill-white" />
                    </div>
                    <div>
                        <h2 className="text-white font-black text-2xl tracking-tight">Instant Engine <span className="text-primary-brand">AI</span></h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Protocol Version 4.8.0</p>
                    </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 mb-6 font-mono text-[10px] space-y-1.5 min-h-[140px]">
                    <AnimatePresence>
                        {logs.map((log, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-emerald-500/80 leading-relaxed"
                            >
                                {log}
                            </motion.p>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>Initialization</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-primary-brand shadow-[0_0_15px_rgba(129,6,209,0.5)]"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function WizardPage() {
    const [isInitialized, setIsInitialized] = useState(false);

    return (
        <Suspense fallback={<div className="h-screen bg-slate-950 flex items-center justify-center text-white font-black uppercase tracking-widest">Loading Engine...</div>}>
            <WizardProvider>
                <AnimatePresence mode="wait">
                    {!isInitialized ? (
                        <StrategicLoader key="loader" onComplete={() => setIsInitialized(true)} />
                    ) : (
                        <motion.div
                            key="wizard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-screen"
                        >
                            <WizardShell />
                        </motion.div>
                    )}
                </AnimatePresence>
            </WizardProvider>
        </Suspense>
    );
}
