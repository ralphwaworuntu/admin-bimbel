"use client";

import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white font-sans">
            <nav className="h-20 px-8 lg:px-12 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2 group text-slate-500 hover:text-primary-brand transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Back to Hub</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary-brand" />
                    <span className="font-bold text-lg tracking-tight">Sovereign <span className="text-primary-brand">Privacy</span></span>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto py-24 px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <div className="space-y-4 text-center">
                        <h1 className="text-5xl font-black tracking-tighter">Privacy Protocol</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Last Updated: February 2026</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-200 dark:border-slate-800 shadow-xl space-y-10">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight">1. Data Sovereignty</h2>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                At Instant Engine, we believe your data belongs to you. Our infrastructure is designed to provide maximum transparency and control over how your information is handled. All deployment logs and environmental variables are encrypted using industry-standard protocols.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight">2. Information Governance</h2>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                We collect minimal telemetric data necessary to ensure the stability of the Sovereign Lattice. This includes:
                            </p>
                            <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 space-y-2 font-medium">
                                <li>Edge deployment success rates</li>
                                <li>Global traffic oscillation patterns</li>
                                <li>Infrastructure node health status</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight">3. Security Measures</h2>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                All communications between your control terminal and the deployment nodes are protected by Level 7 Guardian protocols. We do not sell your data to third-party entities.
                            </p>
                        </section>
                    </div>

                    <div className="text-center">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
                            EngineAI Sovereign Infrastructure • Security First
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
