"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Zap,
    Users,
    Globe,
    ArrowLeft,
    ChevronRight,
    BarChart3,
    Server,
    Lock,
    Headphones
} from "lucide-react";
import Link from "next/link";

export default function EnterprisePage() {
    const features = [
        {
            title: "Advanced Security",
            desc: "SSO, SAML integration, and granular RBAC to keep your data secure.",
            icon: <Lock className="w-6 h-6" />,
            color: "bg-blue-500"
        },
        {
            title: "Global Infrastructure",
            desc: "Multi-region deployment with 99.99% uptime SLA guaranteed.",
            icon: <Globe className="w-6 h-6" />,
            color: "bg-indigo-500"
        },
        {
            title: "Dedicated Support",
            desc: "24/7 priority access to our expert engineering team.",
            icon: <Headphones className="w-6 h-6" />,
            color: "bg-emerald-500"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-display">
            {/* Header */}
            <nav className="p-8 flex items-center justify-between">
                <Link href="/">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-500 font-bold text-sm hover:scale-105 transition-all shadow-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
                    </button>
                </Link>
                <div className="flex items-center gap-2">
                    <div className="bg-primary-brand p-2 rounded-xl">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-black text-xl tracking-tight">Enterprise<span className="text-primary-brand">Guard</span></span>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <span className="px-4 py-1.5 rounded-full bg-primary-brand/10 text-primary-brand text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block">Enterprise Edition</span>
                    <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
                        Built for the <span className="text-primary-brand">Scale</span> of Tomorrow.
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        The most secure, performant, and reliable way for large organizations to build and scale digital presence at light speed.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <Link href={f.title === 'Advanced Security' ? '/dashboard/settings/security' : f.title === 'Global Infrastructure' ? '/dashboard/deployments' : '/nexus'}>
                                <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-left hover:shadow-2xl hover:shadow-primary-brand/5 transition-all group h-full">
                                    <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                                        {f.icon}
                                    </div>
                                    <h3 className="text-2xl font-black mb-4">{f.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Audit Log Preview Section */}
                <section className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-left overflow-hidden relative border border-slate-800 shadow-2xl">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-brand/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">Total Visibility into Every Action.</h2>
                            <p className="text-lg text-slate-400 mb-10 font-medium">
                                Nexus Enterprise provides high-fidelity audit trails for SOC2 compliance. Track every login, site deployment, and team change in real-time.
                            </p>
                            <Link href="/dashboard/settings/security">
                                <button className="px-10 py-5 bg-primary-brand text-white rounded-2xl font-black text-sm shadow-2xl shadow-primary-brand/20 hover:scale-105 transition-all flex items-center gap-3">
                                    Experience Audit Logs <ChevronRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-500/30"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/30"></div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Live_Audit_Stream</span>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <Zap className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-white">Site Published</p>
                                                    <p className="text-[8px] font-bold text-slate-500">2s ago • ID: #99A12</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400">Alex R.</p>
                                                <p className="text-[8px] font-bold text-slate-600">IP: 192.168.1.1</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="p-20 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2024 Nexus Enterprise • SOC2 Type II Certified</p>
            </footer>
        </div>
    );
}
