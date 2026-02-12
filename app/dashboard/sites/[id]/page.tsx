"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Globe,
    BarChart3,
    Settings,
    ExternalLink,
    ShieldCheck,
    Clock,
    ArrowLeft,
    Layout,
    Palette,
    Server,
    Activity,
    CheckCircle2,
    AlertCircle,
    Zap,
    Gauge,
    Lock,
    ChevronRight,
    MoreHorizontal,
    RefreshCw,
    Eye,
    CreditCard,
    Plus,
    Bell,
    TrendingUp,
    Monitor,
    Search
} from "lucide-react";
import { NotificationPanel } from "@/components/notifications-panel";
import Link from "next/link";
import { useState, use } from "react";
import { StyleEditor } from "@/components/style-editor";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Mon", visits: 400 },
    { name: "Tue", visits: 300 },
    { name: "Wed", visits: 900 },
    { name: "Thu", visits: 800 },
    { name: "Fri", visits: 1500 },
    { name: "Sat", visits: 2100 },
    { name: "Sun", visits: 1900 },
];

const tabs = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "infrastructure", label: "Infrastructure", icon: Server },
    { id: "billing", label: "Subscriptions", icon: CreditCard },
];

export default function SiteConsolePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-slate-950 font-display selection:bg-primary-brand/30 selection:text-primary-brand">
            {/* Console Header */}
            <header className="h-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-10 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                    </Link>

                    <div className="flex items-center gap-4 border-l border-slate-100 dark:border-slate-800 pl-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary-brand flex items-center justify-center text-white shadow-xl shadow-primary-brand/20">
                            <span className="material-icons text-2xl font-black">coffee</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <h1 className="text-xl font-black tracking-tight">Artisan Brew Coffee</h1>
                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/10">Live</span>
                            </div>
                            <a
                                href={`https://artisan-brew.waas.site`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-bold text-slate-400 flex items-center gap-1.5 hover:text-primary-brand cursor-pointer group transition-colors"
                            >
                                <Globe className="w-3.5 h-3.5" /> artisan-brew.waas.site <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-6 pr-6 border-r border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-slate-400 cursor:hover:border-primary-brand/30 transition-all">
                            <Search className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Command Center</span>
                            <div className="flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 text-[10px] font-black">
                                <span className="opacity-50">⌘</span>K
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Server Node</p>
                            <div className="text-xs font-black flex items-center gap-1.5 justify-end">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> us-east-1 (Engine-NY)
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsNotifOpen(true)}
                            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary-brand transition-all relative"
                        >
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary-brand rounded-full border-2 border-white dark:border-slate-800"></span>
                        </button>
                        <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black shadow-2xl hover:bg-primary-brand hover:text-white dark:hover:bg-primary-brand dark:hover:text-white transition-all flex items-center gap-2">
                            <Plus className="w-4 h-4" /> New Page
                        </button>
                    </div>
                    <button className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-10">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-black transition-all relative whitespace-nowrap ${activeTab === tab.id
                                ? "text-primary-brand"
                                : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-primary-brand" : "opacity-50"}`} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-primary-brand"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <main className="p-10 lg:p-14 max-w-[1600px] mx-auto space-y-12">
                <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            {/* Health & Performance Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Security Health
                                    </h3>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-4xl font-black mb-2">Secure</p>
                                            <p className="text-xs font-bold text-slate-500">SSL Certificate expires in 84 days</p>
                                        </div>
                                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <Lock className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                                        <span className="text-xs font-black text-slate-400">Threat Protection</span>
                                        <span className="text-xs font-black text-emerald-500">Active</span>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                                        <Gauge className="w-3.5 h-3.5 text-primary-brand" /> Performance Score
                                    </h3>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-4xl font-black mb-2 text-primary-brand">98<span className="text-lg opacity-50">/100</span></p>
                                            <p className="text-xs font-bold text-slate-500">0.8s LCP • Page Size 1.2MB</p>
                                        </div>
                                        <div className="w-16 h-16 rounded-2xl bg-primary-brand/10 flex items-center justify-center text-primary-brand">
                                            <Zap className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "98%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-primary-brand"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-amber-500" /> SEO Ranking
                                    </h3>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-4xl font-black mb-2">High</p>
                                            <p className="text-xs font-bold text-slate-500">12 Primary keywords in Top 10</p>
                                        </div>
                                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                            <BarChart3 className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                                        <span className="text-xs font-black text-slate-400">Search Visibility</span>
                                        <span className="text-xs font-black text-amber-500">+4.2% this month</span>
                                    </div>
                                </div>
                            </div>

                            {/* Analytics Preview */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between mb-10">
                                        <div>
                                            <h3 className="text-2xl font-black mb-1">Traffic Trends</h3>
                                            <p className="text-sm font-bold text-slate-400">Daily unique visitors across all devices</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black">7D</button>
                                            <button className="px-4 py-2 text-slate-400 text-xs font-black">30D</button>
                                            <button className="px-4 py-2 text-slate-400 text-xs font-black">90D</button>
                                        </div>
                                    </div>
                                    <div className="h-[350px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data}>
                                                <defs>
                                                    <linearGradient id="colorVisitsConsole" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8106d1" stopOpacity={0.2} />
                                                        <stop offset="95%" stopColor="#8106d1" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                                                <XAxis
                                                    dataKey="name"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                                    dy={15}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        borderRadius: '24px',
                                                        border: 'none',
                                                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                                                        padding: '16px 24px'
                                                    }}
                                                    itemStyle={{ fontWeight: 900, fontSize: '14px', color: '#8106d1' }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="visits"
                                                    stroke="#8106d1"
                                                    strokeWidth={5}
                                                    fillOpacity={1}
                                                    fill="url(#colorVisitsConsole)"
                                                    animationDuration={2500}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm border-l-[12px] border-l-primary-brand">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Build Configuration</p>
                                        <p className="text-xl font-black mb-6">Engine v4.2.0-LTS</p>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-xs font-black">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Next.js 16 Optimized
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-black">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Tailwind v4 Core
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-black">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Framer Motion 12
                                            </div>
                                        </div>
                                        <button className="mt-8 w-full py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-brand hover:text-white transition-all">
                                            <RefreshCw className="w-3.5 h-3.5" /> Rebuild Platform
                                        </button>
                                    </div>

                                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group border border-slate-800 shadow-xl">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-brand/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-4 text-emerald-400 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Infrastructure Healthy
                                            </p>
                                            <h4 className="text-lg font-black mb-2">Smart Caching</h4>
                                            <p className="text-xs font-bold opacity-60 leading-relaxed mb-6">
                                                Your platform assets are being served from 24 global edge locations.
                                            </p>
                                            <button className="w-full py-3 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl text-xs font-black border border-white/10 hover:bg-white hover:text-slate-900 transition-all">
                                                Flush Edge Cache
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "appearance" && (
                        <motion.div
                            key="appearance"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="space-y-10"
                        >
                            <StyleEditor />

                            {/* Tips & Recommendations */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-brand/5 text-primary-brand flex items-center justify-center mb-4">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-sm mb-2">Auto-Optimization</h4>
                                    <p className="text-[10px] font-bold text-slate-400">Styles are automatically minified and optimized for CDN delivery.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 text-emerald-500 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-sm mb-2">WCAG Compliant</h4>
                                    <p className="text-[10px] font-bold text-slate-400">Color contrast ratios are checked against accessibility standards.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/5 text-indigo-500 flex items-center justify-center mb-4">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-sm mb-2">Zero Layout Shift</h4>
                                    <p className="text-[10px] font-bold text-slate-400">Fonts and assets are preloaded to prevent CLS at runtime.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "infrastructure" && (
                        <motion.div
                            key="infrastructure"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-12"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-3xl font-black mb-2">Domain & Connectivity</h3>
                                    <p className="text-slate-400 font-bold">Manage how the world accesses your platform.</p>
                                </div>
                                <Link href="/dashboard/settings/domains">
                                    <button className="px-6 py-3 bg-primary-brand text-white rounded-xl text-xs font-black shadow-lg shadow-primary-brand/20">
                                        Configure Custom Domain
                                    </button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-primary-brand">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black uppercase text-emerald-500">Connected</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Standard Domain</p>
                                        <p className="text-xl font-black">artisan-brew.waas.site</p>
                                    </div>
                                    <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                                        <div className="flex items-center justify-between text-xs font-black">
                                            <span className="text-slate-400">SSL Type</span>
                                            <span>Engine-Managed LetsEncrypt</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-black">
                                            <span className="text-slate-400">DNS Provider</span>
                                            <span>Engine Cloud DNS</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group border-dashed border-2 flex flex-col items-center justify-center text-center p-12 cursor-pointer hover:border-primary-brand transition-all">
                                    <div className="w-16 h-16 rounded-[2rem] bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:text-primary-brand transition-all mb-6">
                                        <Plus className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-black mb-2">Add Custom Domain</h4>
                                    <p className="text-xs font-bold text-slate-400 max-w-xs mx-auto">
                                        Connect your own domain (e.g. artisanbrew.com) with full engine optimization.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "analytics" && (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {[
                                    { label: "Total Sessions", value: "14.2k", growth: "+12.5%", icon: Eye },
                                    { label: "Avg. Duration", value: "02:45", growth: "+4.1%", icon: Clock },
                                    { label: "Bounce Rate", value: "34.2%", growth: "-2.4%", icon: Activity },
                                    { label: "Conv. Rate", value: "3.8%", growth: "+0.8%", icon: TrendingUp },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-brand transition-colors">
                                                <stat.icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-[10px] font-black ${stat.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {stat.growth}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-2xl font-black">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-primary-brand" /> Geographical Distribution
                                    </h3>
                                    <div className="space-y-6">
                                        {[
                                            { country: "United States", visits: "6,420", percent: 45 },
                                            { country: "United Kingdom", visits: "2,140", percent: 15 },
                                            { country: "Germany", visits: "1,850", percent: 13 },
                                            { country: "Japan", visits: "1,140", percent: 8 },
                                        ].map((dest, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex items-center justify-between text-xs font-black">
                                                    <span className="text-slate-500">{dest.country}</span>
                                                    <span>{dest.visits}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${dest.percent}%` }}
                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                        className="h-full bg-primary-brand"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                        <Monitor className="w-5 h-5 text-primary-brand" /> Device & OS Matrix
                                    </h3>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Top Browsers</p>
                                            <div className="space-y-4">
                                                {['Chrome', 'Safari', 'Firefox'].map((b, i) => (
                                                    <div key={i} className="flex items-center justify-between text-xs font-bold">
                                                        <span>{b}</span>
                                                        <span className="text-slate-400">{80 - (i * 20)}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">OS Distribution</p>
                                            <div className="space-y-4">
                                                {['iOS', 'Windows', 'MacOS'].map((o, i) => (
                                                    <div key={i} className="flex items-center justify-between text-xs font-bold">
                                                        <span>{o}</span>
                                                        <span className="text-slate-400">{60 - (i * 15)}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "billing" && (
                        <motion.div
                            key="billing"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12"
                        >
                            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl border border-slate-800">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-brand/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative z-10 flex flex-col md:flex-row gap-12 justify-between items-center">
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                            <CreditCard className="w-4 h-4 text-primary-brand" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Premium Site Slot</span>
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black tracking-tight mb-2">Enterprise Plan Active</h2>
                                            <p className="text-slate-400 font-bold">This site is covered under your Agency Pro Max umbrella.</p>
                                        </div>
                                    </div>
                                    <Link href="/dashboard/billing">
                                        <button className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-primary-brand hover:text-white transition-all shadow-xl">
                                            Individual Billing Docs
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <h3 className="text-xl font-black mb-8">Resource Consumption</h3>
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs font-black">
                                                <span className="text-slate-400 uppercase tracking-widest">Bandwidth</span>
                                                <span>84.2 GB / 1 TB</span>
                                            </div>
                                            <div className="h-3 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 w-[8.4%]" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs font-black">
                                                <span className="text-slate-400 uppercase tracking-widest">Storage</span>
                                                <span>1.2 GB / 50 GB</span>
                                            </div>
                                            <div className="h-3 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 w-[2.4%]" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs font-black">
                                                <span className="text-slate-400 uppercase tracking-widest">Media Assets</span>
                                                <span>142 files / ∞</span>
                                            </div>
                                            <div className="h-3 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-500 w-[45%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <h3 className="text-xl font-black mb-8">Service Parameters</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { label: 'Edge Nodes', value: '24 Active' },
                                            { label: 'SSL Protocol', value: 'TLS 1.3' },
                                            { label: 'DDoS Shield', value: 'Enabled' },
                                            { label: 'WAF Policy', value: 'Optimized' },
                                        ].map((serv, i) => (
                                            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{serv.label}</p>
                                                <p className="text-sm font-black text-primary-brand">{serv.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black">All services operational</p>
                                            <p className="text-[10px] font-bold text-slate-400">Node cluster sync completed 4 mins ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="mt-20 p-12 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                <p>© 2024 Project Console • Node: 771-A-01 • Uptime 100%</p>
                <div className="flex items-center gap-10">
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> All Systems Operational
                    </span>
                    <Link href="/nexus" className="hover:text-primary-brand transition-colors">Documentation</Link>
                </div>
            </footer>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>
    );
}

function Sparkles(props: any) {
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
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    )
}
