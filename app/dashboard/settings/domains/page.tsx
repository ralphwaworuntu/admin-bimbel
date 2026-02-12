"use client";

import { motion } from "framer-motion";
import {
    Globe,
    ShieldCheck,
    Clock,
    ArrowLeft,
    Plus,
    Search,
    AlertCircle,
    CheckCircle2,
    ExternalLink,
    RefreshCw,
    MoreHorizontal,
    ChevronRight,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SettingsSidebar } from "@/components/settings-sidebar";

const domains = [
    {
        id: "dom_1",
        hostname: "artisanbrew.com",
        status: "active",
        type: "primary",
        ssl: "valid",
        added: "Jan 12, 2024",
        redirects: 2
    },
    {
        id: "dom_2",
        hostname: "shop.artisanbrew.com",
        status: "pending",
        type: "subdomain",
        ssl: "generating",
        added: "Feb 05, 2024",
        redirects: 0
    },
];

export default function DomainsPage() {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-slate-950 font-display">
            <header className="h-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-10 sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard/settings">
                        <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">Domain Orchestration</h1>
                        <p className="text-xs font-bold text-slate-400">Manage custom URLs and SSL certificates</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">All SSL Clusters Active</span>
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="px-6 py-2.5 bg-primary-brand text-white rounded-xl text-xs font-black shadow-xl shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Connect Domain
                    </button>
                </div>
            </header>

            <main className="p-10 lg:p-14 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-1">
                    <SettingsSidebar />
                </div>

                <div className="lg:col-span-3 space-y-12">
                    {/* Status Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: "Active Domains", value: "2", icon: Globe, color: "text-blue-500" },
                            { label: "SSL Uptime", value: "100%", icon: ShieldCheck, color: "text-emerald-500" },
                            { label: "Propagation", value: "Global", icon: Zap, color: "text-amber-500" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6">
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Domains Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-2xl font-black tracking-tight">Configured Namespaces</h3>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-primary-brand transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search domains..."
                                    className="bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-2.5 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary-brand/20 transition-all outline-none w-64"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-10 py-6">Domain Name</th>
                                        <th className="px-10 py-6">Status</th>
                                        <th className="px-10 py-6">Security</th>
                                        <th className="px-10 py-6">Added</th>
                                        <th className="px-10 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {domains.map((dom) => (
                                        <tr key={dom.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-brand transition-colors">
                                                        <Globe className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black">{dom.hostname}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dom.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${dom.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                    {dom.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck className={`w-4 h-4 ${dom.ssl === 'valid' ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`} />
                                                    <span className="text-xs font-bold text-slate-500">{dom.ssl === 'valid' ? 'TLS 1.3 Active' : 'Provisioning...'}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-sm font-bold text-slate-400">{dom.added}</td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg hover:text-primary-brand transition-all">
                                                        <RefreshCw className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg hover:text-primary-brand transition-all">
                                                        <Settings className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Propagation Intelligence */}
                    <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-brand/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black tracking-tight">Edge Infrastructure</h3>
                                <p className="text-slate-400 font-bold leading-relaxed">
                                    Your domains are piped through EngineAI's Sovereign Edge Network with 32 points of presence worldwide.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">Global Anycast IP</div>
                                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest font-mono text-primary-brand">72.11.0.12</div>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fastest Node</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="font-black">US-EAST (Virginia)</span>
                                        </div>
                                        <span className="text-xs font-mono text-emerald-500">12ms</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-brand w-[85%]" />
                                    </div>
                                </div>
                                <button className="w-full mt-8 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-brand hover:text-white transition-all">
                                    View Full Edge Map
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Empty State / Connection Drawer Mockup */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsAdding(false)}
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-xl h-full bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-12 overflow-y-auto"
                    >
                        <button
                            onClick={() => setIsAdding(false)}
                            className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"
                        >
                            <ArrowLeft className="w-6 h-6 rotate-180" />
                        </button>

                        <div className="space-y-12">
                            <div>
                                <div className="w-16 h-16 rounded-[2rem] bg-primary-brand/10 flex items-center justify-center text-primary-brand mb-8">
                                    <Globe className="w-8 h-8" />
                                </div>
                                <h2 className="text-4xl font-black tracking-tight mb-4">Connect Domain</h2>
                                <p className="text-slate-400 font-bold leading-relaxed">
                                    Enter your domain name. We'll verify ownership and provision SSL automatically.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hostname</label>
                                    <input
                                        type="text"
                                        placeholder="artisanbrew.com"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary-brand/20 transition-all outline-none"
                                    />
                                </div>
                                <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4">
                                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                    <p className="text-[10px] font-bold text-amber-600 leading-relaxed uppercase tracking-wide">
                                        Ensure your DNS records are pointed to EngineAI's edge servers before connecting.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-10">
                                <button className="w-full py-5 bg-primary-brand text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-brand/20 hover:scale-[1.02] active:scale-95 transition-all">
                                    Verify & Provision
                                </button>
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="w-full py-5 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-100 active:scale-95 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function Settings(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}
