"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Settings,
    Shield,
    Users,
    Palette,
    Key,
    Bell,
    ChevronRight,
    Check,
    Lock,
    Eye,
    Globe
} from "lucide-react";
import { useState } from "react";

const tabs = [
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'domains', label: 'Domains', icon: Globe },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API & Webhooks', icon: Key },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('branding');

    return (
        <div className="p-8 lg:p-12 space-y-12 pb-32">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Platform Settings</h1>
                    <p className="text-slate-500 font-bold flex items-center gap-2">
                        Configure your Sovereign Ecosystem's core parameters.
                    </p>
                </div>
                <Link href="/dashboard">
                    <button className="bg-primary-brand text-white px-8 py-4 rounded-2xl text-xs font-black shadow-xl shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                        Save Changes
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 text-primary-brand' : 'text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                            {activeTab === tab.id && <ChevronRight className="ml-auto w-4 h-4" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-12">
                    {activeTab === 'branding' && <BrandingSettings />}
                    {activeTab === 'domains' && <Link href="/dashboard/settings/domains"><div className="p-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-brand transition-all"><Globe className="w-12 h-12 text-slate-300 mb-6" /><h3 className="text-xl font-black mb-2">Redirecting to Domain Orchestration</h3><p className="text-sm font-bold text-slate-400">Manage custom URLs and SSL in our new dedicated terminal.</p><button className="mt-8 px-8 py-3 bg-primary-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Open Terminal</button></div></Link>}
                    {activeTab === 'team' && <TeamSettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                    {activeTab === 'api' && <ApiSettings />}
                </div>
            </div>
        </div>
    );
}

function BrandingSettings() {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-10">
                <div className="space-y-6">
                    <h3 className="text-xl font-black tracking-tight">Identity & Aesthetics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Platform Name</label>
                            <input type="text" defaultValue="EngineAI Sovereign" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary-brand/20 transition-all outline-none" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Color</label>
                            <div className="flex gap-3">
                                <div className="w-12 h-12 rounded-xl bg-primary-brand border-4 border-white dark:border-slate-800 shadow-xl cursor-pointer"></div>
                                <input type="text" defaultValue="#8106D1" className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary-brand/20 transition-all outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-black tracking-tight">Global Header Logo</h3>
                    <div className="flex items-center gap-8 p-8 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                            <Eye className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm font-black mb-1">Upload Workspace Logo</p>
                            <p className="text-xs font-bold text-slate-400 mb-4">PNG, SVG or WEBP. Max 2MB.</p>
                            <button className="text-[10px] font-black uppercase tracking-widest text-primary-brand">Choose File</button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function TeamSettings() {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black tracking-tight">Active Operatives</h3>
                    <Link href="/nexus">
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-brand bg-primary-brand/5 px-4 py-2 rounded-xl border border-primary-brand/10 hover:bg-primary-brand/10 transition-all">
                            <Users className="w-3 h-3" /> Invite Member
                        </button>
                    </Link>
                </div>
                <div className="space-y-4">
                    {[
                        { name: "Alex Rivera", role: "Owner", email: "alex@engine.ai" },
                        { name: "Sarah Connor", role: "Guardian", email: "sarah@sky.net" },
                    ].map((member, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary-brand/10 flex items-center justify-center text-primary-brand font-black">
                                    {member.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-black">{member.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400">{member.email}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full">{member.role}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function SecuritySettings() {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-black tracking-tight mb-10">Advanced Protection</h3>
                <div className="space-y-4">
                    {[
                        { title: "Two-Factor Authentication", desc: "Secure your account with 2FA", active: true },
                        { title: "Hardware Key Support", desc: "Use Yubikey or Titan for absolute security", active: false },
                        { title: "Session Guard", desc: "Automatically terminate inactive sessions", active: true },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="text-sm font-black mb-1">{item.title}</p>
                                <p className="text-xs font-bold text-slate-400">{item.desc}</p>
                            </div>
                            <button className={`w-12 h-6 rounded-full p-1 transition-all ${item.active ? 'bg-primary-brand flex justify-end' : 'bg-slate-200 dark:bg-slate-700 flex justify-start'}`}>
                                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function ApiSettings() {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-slate-950 text-white p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                    <Key className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl font-black flex items-center gap-3 mb-6">
                        <Lock className="w-5 h-5 text-primary-brand" /> Production API Keys
                    </h3>
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 font-mono text-[11px] text-slate-400 break-all flex items-center justify-between gap-4">
                        <span>sk_live_51MvN2zL4bXjQy8zV...9zVqWxpR</span>
                        <button className="text-primary-brand font-black shrink-0 hover:underline">Copy Key</button>
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-6">Created 14 days ago • Never rotated</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary-brand" /> Incoming Webhooks
                </h3>
                <div className="space-y-6">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-black uppercase tracking-widest">Site_Deployment_Success</p>
                            <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/10">Active</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold mb-4">Endpoint: https://api.hooks.io/v1/deployments</p>
                        <button className="text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors">Delete Hook</button>
                    </div>
                    <button className="w-full py-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-brand hover:border-primary-brand/30 transition-all">
                        + Create New Webhook
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
