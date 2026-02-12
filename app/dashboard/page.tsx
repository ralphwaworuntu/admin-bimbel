"use client";

import { motion } from "framer-motion";
import {
    Globe,
    ExternalLink,
    Plus,
    Sparkles,
    Layout,
    Zap,
    Users,
    Mail,
    ChevronRight,
    Terminal,
    Search,
    Target,
    Command,
    Settings,
    Shield,
    X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GuardianConsole } from "@/components/dashboard/guardian-console";
import { GlobalTrafficPulse } from "@/components/dashboard/global-traffic-pulse";
import { ContentStudio } from "@/components/dashboard/content-studio";
import { HealthLattice } from "@/components/dashboard/health-lattice";
import { PredictiveIntelligence } from "@/components/dashboard/predictive-intelligence";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Mon", visits: 4000 },
    { name: "Tue", visits: 3000 },
    { name: "Wed", visits: 2000 },
    { name: "Thu", visits: 2780 },
    { name: "Fri", visits: 1890 },
    { name: "Sat", visits: 2390 },
    { name: "Sun", visits: 3490 },
];

const sites = [
    { id: 1, name: "Luxury Estate v2", url: "luxury-estate.engine.ai", visits: "124.5k", status: "live", uptime: "99.99%", latency: "24ms", lastDeploy: "2m ago" },
    { id: 2, name: "Quantum Portal", url: "quantum.engine.ai", visits: "89.2k", status: "live", uptime: "100%", latency: "18ms", lastDeploy: "1h ago" },
    { id: 3, name: "Prism Labs", url: "prism-labs.engine.ai", visits: "12.1k", status: "provisioning", uptime: "0%", latency: "--", lastDeploy: "Just now" },
];

import { CommandHUD } from "@/components/dashboard/command-hud";
import { GlobalHeatmap } from "@/components/dashboard/global-heatmap";

export default function DashboardOverview() {
    const [allSites, setAllSites] = useState<any[]>(sites);
    const [selectedSite, setSelectedSite] = useState<any | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('waas_sites');
        if (stored) {
            try {
                const localSites = JSON.parse(stored);
                // Merge with default sites, avoiding duplicates by ID or URL
                const merged = [...localSites, ...sites.filter(s => !localSites.find((ls: any) => ls.url === s.url))];
                setAllSites(merged);
            } catch (e) {
                console.error("Error parsing waas_sites", e);
            }
        }
    }, []);

    return (
        <div className="space-y-8 lg:space-y-12 pb-32">
            <CommandHUD />

            {/* Sovereign Header - Adaptive Stacking */}
            <div className="bg-slate-950 border border-white/10 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 flex flex-col xl:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,6,209,0.1),transparent_70%)]"></div>

                <div className="flex items-center justify-between relative z-10 w-full xl:w-auto">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-primary-brand flex items-center justify-center text-white shadow-[0_0_30px_rgba(129,6,209,0.4)] shrink-0">
                            <Sparkles className="w-7 h-7 lg:w-8 lg:h-8" />
                        </div>
                        <div>
                            <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight">Ecosystem Sovereign</h1>
                            <div className="flex items-center gap-3 mt-1 group/health relative">
                                <Link href="/nexus" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Autonomous Health:</span>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Optimal</span>
                                    </div>
                                </Link>

                                {/* Health Infotip */}
                                <div className="absolute top-full left-0 mt-4 w-64 p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/health:opacity-100 group-hover/health:translate-y-0 group-hover/health:pointer-events-auto transition-all z-50">
                                    <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Health Analysis</p>
                                    <div className="space-y-2">
                                        <Link href="/dashboard/guardian" className="flex justify-between items-center hover:opacity-70 transition-opacity">
                                            <span className="text-[9px] text-white">Lattice Stability</span>
                                            <span className="text-[9px] text-emerald-500 font-bold underline decoration-emerald-500/30">100.0%</span>
                                        </Link>
                                        <Link href="/dashboard/deployments" className="flex justify-between items-center hover:opacity-70 transition-opacity">
                                            <span className="text-[9px] text-white">Edge Sync Latency</span>
                                            <span className="text-[9px] text-emerald-500 font-bold underline decoration-emerald-500/30">12ms</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HUD Trigger */}
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-hud'))}
                        className="xl:hidden w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-xl"
                    >
                        <Terminal className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 relative z-10 xl:px-8 border-t xl:border-t-0 xl:border-l border-white/10 pt-8 xl:pt-0">
                    <Link href="/dashboard/deployments" className="flex flex-col group/stat cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all relative">
                        <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Sites Live</span>
                        <span className="text-lg lg:text-xl font-black text-white">{allSites.length} <span className="text-[10px] text-emerald-500 ml-1">+{allSites.filter(s => s.status === 'live').length}</span></span>
                    </Link>
                    <Link href="/dashboard/analytics" className="flex flex-col group/stat cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
                        <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Weekly Reach</span>
                        <span className="text-lg lg:text-xl font-black text-white">2.4M <span className="text-[10px] text-emerald-500 ml-1">18.2%</span></span>
                    </Link>
                    <Link href="/dashboard/guardian" className="flex flex-col hidden md:flex group/stat cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
                        <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Infrastructure</span>
                        <span className="text-lg lg:text-xl font-black text-white">42 Nodes</span>
                    </Link>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-hud'))}
                        className="hidden xl:flex flex-col items-center justify-center group/stat cursor-pointer bg-white/5 hover:bg-white/10 p-2 rounded-2xl transition-all relative border border-white/5"
                    >
                        <Command className="w-3 h-3 text-primary-brand" />
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Quick HUD</span>
                        </div>
                        <span className="text-[9px] font-black text-white bg-slate-800 px-2 py-0.5 rounded-md border border-white/10 opacity-60 group-hover:opacity-100 transition-opacity tracking-widest">CMD+K</span>
                    </button>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {[
                    { label: "Create New Site", icon: <Plus className="w-5 h-5" />, href: "/wizard", color: "bg-primary-brand text-white shadow-primary-brand/30" },
                    { label: "View Analytics", icon: <Target className="w-5 h-5" />, href: "/dashboard/analytics", color: "bg-blue-500 text-white shadow-blue-500/30" },
                    { label: "Guardian Console", icon: <Shield className="w-5 h-5" />, href: "/dashboard/guardian", color: "bg-emerald-500 text-white shadow-emerald-500/30" },
                    { label: "Deployments", icon: <Globe className="w-5 h-5" />, href: "/dashboard/deployments", color: "bg-amber-500 text-white shadow-amber-500/30" },
                ].map((action, i) => (
                    <Link key={i} href={action.href}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                            className={`p-5 lg:p-6 rounded-2xl ${action.color} shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex flex-col gap-3`}
                        >
                            {action.icon}
                            <span className="text-[10px] font-black uppercase tracking-widest">{action.label}</span>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Elastic Intelligence Matrix */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
                <PredictiveIntelligence />
                <HealthLattice />
            </div>

            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 lg:gap-10">
                <GuardianConsole />
                <GlobalTrafficPulse />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10">
                <div className="xl:col-span-1">
                    <ContentStudio />
                </div>

                <div className="xl:col-span-2 space-y-6">
                    <Link href="/dashboard/analytics" className="flex items-center justify-between group/header">
                        <h3 className="text-xl font-black tracking-tight group-hover:text-primary-brand transition-colors">Strategic Yield Map</h3>
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10">Edge Active</div>
                    </Link>
                    <GlobalHeatmap />
                </div>
            </div>

            {/* Site Grid Section - Optimized for Spacing */}
            <div className="space-y-8">
                <div className="flex items-center justify-between px-2">
                    <Link href="/dashboard/deployments" className="hover:opacity-70 transition-opacity">
                        <h2 className="text-2xl font-black tracking-tight">Active Deployments</h2>
                    </Link>
                    <span className="bg-primary-brand/5 text-primary-brand px-4 py-2 rounded-xl text-[10px] font-black border border-primary-brand/10 uppercase tracking-widest">{allSites.length} Projects</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
                    {allSites.map((site, i) => (
                        <motion.div
                            key={site.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col cursor-pointer"
                            onClick={() => setSelectedSite(site)}
                        >
                            <div className="bg-slate-100 dark:bg-slate-800 aspect-[16/10] relative overflow-hidden">
                                <div className="absolute inset-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="w-full h-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl"></div>
                                        <div className="w-2/3 h-2 bg-slate-50 dark:bg-slate-800/50 rounded-full"></div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-primary-brand/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                    <button
                                        className="px-5 py-2.5 bg-white dark:bg-slate-900 text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:scale-110 transition-all font-black"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedSite(site);
                                        }}
                                    >
                                        Live Manage
                                    </button>
                                    <button
                                        className="p-2.5 bg-primary-brand text-white rounded-xl shadow-lg hover:scale-110 transition-all"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://${site.url}`, '_blank');
                                        }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <div className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5 ${site.status === 'live' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                        <div className={`w-1 h-1 rounded-full bg-white ${site.status === 'live' ? 'animate-pulse' : ''}`}></div>
                                        {site.status}
                                    </div>
                                    {site.region && (
                                        <div className="px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5 bg-slate-900 text-white border border-white/10">
                                            <Globe className="w-2.5 h-2.5" />
                                            {site.region}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 lg:p-8 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-6 gap-4">
                                    <div className="min-w-0">
                                        <h4 className="font-black text-base lg:text-lg tracking-tight mb-1 truncate">{site.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 truncate">{site.url}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0">
                                        <Globe className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">Visits</p>
                                        <p className="text-xs font-black">{site.visits}</p>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">Latency</p>
                                        <p className="text-xs font-black text-emerald-500">{site.latency}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <Link href="/wizard" className="bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center gap-6 p-8 min-h-[350px] hover:border-primary-brand hover:bg-primary-brand/5 transition-all group cursor-pointer">
                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-primary-brand group-hover:scale-110 transition-all shadow-sm">
                            <Plus className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-base font-black tracking-tight mb-1">Synthesize Site</p>
                            <p className="text-[10px] font-bold text-slate-400 max-w-[120px] mx-auto leading-relaxed">Begin new autonomous deployment</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Site Management Drawer Overlay */}
            <AnimatePresence>
                {selectedSite && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSite(null)}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] cursor-default"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white dark:bg-[#020617] border-l border-slate-100 dark:border-white/10 z-[101] flex flex-col shadow-[-30px_0_100px_rgba(0,0,0,0.3)]"
                        >
                            <div className="p-8 lg:p-12 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-primary-brand/10 flex items-center justify-center text-primary-brand shadow-inner">
                                        <Globe className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight">{selectedSite.name}</h2>
                                        <p className="text-xs font-bold text-slate-400 mt-1">{selectedSite.url}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedSite(null)}
                                    className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary-brand transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Conversion Score</p>
                                        <p className="text-lg font-black text-primary-brand">{selectedSite.score || "84"}%</p>
                                    </div>
                                    <div className={`p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5`}>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Market Pulse</p>
                                        <p className="text-lg font-black uppercase tracking-tight">{selectedSite.region || "Global"}</p>
                                    </div>
                                    <div className="p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Uptime</p>
                                        <p className="text-lg font-black text-emerald-500">{selectedSite.uptime || "100%"}</p>
                                    </div>
                                    <div className="p-5 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Latency</p>
                                        <p className="text-lg font-black">{selectedSite.latency || "14ms"}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                                        <Terminal className="w-4 h-4" /> Live Execution Stream
                                    </h3>
                                    <div className="bg-slate-950 rounded-3xl p-6 font-mono text-[11px] leading-relaxed space-y-2 border border-white/5">
                                        <p className="text-emerald-500/80">[SYSTEM] Connection established to Edge-SG-1</p>
                                        <p className="text-slate-500">{"2026-02-12 00:54:12"} {"->"} GET /index.html 200 OK (12ms)</p>
                                        <p className="text-slate-500">{"2026-02-12 00:54:13"} {"->"} API request to /graph/v1/sites</p>
                                        <p className="text-blue-400/80">[AUDIT] L7 Firewall scrubbed incoming request (ID: #X921)</p>
                                        <p className="text-slate-500">{"2026-02-12 00:54:15"} {"->"} Cache Hit: asset/main.css (0ms)</p>
                                        <div className="w-1 h-1 bg-emerald-500 animate-pulse inline-block ml-1"></div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                                        <Search className="w-4 h-4" /> Management Actions
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <Link href="/dashboard/settings" className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-primary-brand transition-all text-left">
                                            <div className="flex items-center gap-4">
                                                <Zap className="w-5 h-5 text-primary-brand" />
                                                <span className="text-xs font-black uppercase tracking-widest">Rollback Version</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300" />
                                        </Link>
                                        <Link href="/dashboard/settings" className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-primary-brand transition-all text-left">
                                            <div className="flex items-center gap-4">
                                                <Settings className="w-5 h-5 text-slate-400" />
                                                <span className="text-xs font-black uppercase tracking-widest">Environment Env</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300" />
                                        </Link>
                                        <button className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-red-500/50 transition-all text-left group">
                                            <div className="flex items-center gap-4 text-slate-400 group-hover:text-red-500 transition-colors">
                                                <Shield className="w-5 h-5" />
                                                <span className="text-xs font-black uppercase tracking-widest">Purge Domain</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 lg:p-12 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/2 flex gap-4">
                                <button className="flex-1 bg-primary-brand text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    Deploy Update
                                </button>
                                <button
                                    className="px-6 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                    onClick={() => window.open(`https://${selectedSite.url}`, '_blank')}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
