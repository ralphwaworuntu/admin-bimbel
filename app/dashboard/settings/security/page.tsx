"use client";

import { motion } from "framer-motion";
import {
    Shield,
    Lock,
    Key,
    Smartphone,
    History,
    Search,
    Filter,
    ArrowLeft,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Palette,
    Globe,
    ExternalLink,
    LogOut,
    Eye
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SettingsSidebar } from "@/components/settings-sidebar";

const auditLogs = [
    { id: 1, event: "Login Successful", user: "Alex Rivera", ip: "192.168.1.1", location: "New York, US", time: "2 mins ago", status: "success" },
    { id: 2, event: "Site Published", user: "Alex Rivera", ip: "192.168.1.1", location: "New York, US", time: "1 hour ago", status: "success" },
    { id: 3, event: "Password Changed", user: "Sarah Chen", ip: "185.22.10.4", location: "London, UK", time: "5 hours ago", status: "warning" },
    { id: 4, event: "API Key Generated", user: "System", ip: "-", location: "Internal", time: "1 day ago", status: "success" },
    { id: 5, event: "Failed Login Attempt", user: "Unknown", ip: "45.12.99.1", location: "Moscow, RU", time: "2 days ago", status: "danger" },
];

const sessions = [
    { id: 1, device: "MacBook Pro 16\"", browser: "Chrome", location: "New York, US", current: true, lastActive: "Active now" },
    { id: 2, device: "iPhone 15 Pro", browser: "Safari", location: "New York, US", current: false, lastActive: "12 mins ago" },
];

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-slate-950 font-display">
            {/* Header */}
            <header className="h-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-10 sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard">
                        <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">Enterprise Security</h1>
                        <p className="text-xs font-bold text-slate-400">Manage 2FA, sessions, and audit logs</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black border border-slate-100 dark:border-slate-700 hover:bg-slate-100 transition-all flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Security Score: 98%
                    </button>
                </div>
            </header>

            <main className="p-10 lg:p-14 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Settings Sidebar */}
                    <SettingsSidebar />

                    <div className="lg:col-span-8 space-y-12">
                        {/* 2FA & Auth Section */}
                        <section className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h3 className="text-2xl font-black mb-8">Multi-Factor Authentication</h3>
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between group cursor-pointer hover:border-primary-brand/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-primary-brand">
                                            <Smartphone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black">Authenticator App</p>
                                            <p className="text-[10px] font-bold text-slate-400">Google Authenticator, Authy or Microsoft Authenticator</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">Active</span>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between group cursor-pointer hover:border-primary-brand/30 transition-all opacity-60">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-400">
                                            <Key className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black">Hardware Security Key</p>
                                            <p className="text-[10px] font-bold text-slate-400">Yubikey or Titan Security Key</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 text-[10px] font-black uppercase tracking-widest">Setup</span>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Active Sessions */}
                        <section className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black">Active Sessions</h3>
                                <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Revoke All</button>
                            </div>
                            <div className="divide-y divide-slate-50 dark:divide-slate-800">
                                {sessions.map(session => (
                                    <div key={session.id} className="py-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                <Monitor className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-black">{session.device}</p>
                                                    {session.current && <span className="px-2 py-0.5 rounded-md bg-primary-brand/10 text-primary-brand text-[8px] font-black uppercase tracking-widest">Current</span>}
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-400">{session.browser} • {session.location} • {session.lastActive}</p>
                                            </div>
                                        </div>
                                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                                            <LogOut className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Audit Logs */}
                        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-primary-brand shadow-sm">
                                        <History className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight">Security Audit Logs</h3>
                                </div>
                                <div className="flex gap-3">
                                    <button className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-slate-400 hover:text-primary-brand transition-all shadow-sm">
                                        <Filter className="w-4 h-4" />
                                    </button>
                                    <button className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-slate-400 hover:text-primary-brand transition-all shadow-sm">
                                        <Search className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30 dark:bg-slate-800/20">
                                            <th className="px-10 py-6">Event</th>
                                            <th className="px-10 py-6">User / Actor</th>
                                            <th className="px-10 py-6">IP / Location</th>
                                            <th className="px-10 py-6">Timestamp</th>
                                            <th className="px-10 py-6 text-right">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        {auditLogs.map((log) => (
                                            <tr key={log.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all">
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' :
                                                            log.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                                                            }`}></div>
                                                        <span className="font-black text-sm">{log.event}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8 font-bold text-sm text-slate-600 dark:text-slate-400">{log.user}</td>
                                                <td className="px-10 py-8">
                                                    <p className="text-sm font-black">{log.ip}</p>
                                                    <p className="text-[10px] font-bold text-slate-400">{log.location}</p>
                                                </td>
                                                <td className="px-10 py-8 font-bold text-sm text-slate-500">{log.time}</td>
                                                <td className="px-10 py-8 text-right">
                                                    <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl hover:bg-primary-brand hover:text-white transition-all shadow-sm">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-8 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-center">
                                <button className="text-xs font-black text-primary-brand hover:underline">Download full log history (JSON/CSV)</button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="mt-20 p-12 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                <p>© 2024 Nexus Guard • Advanced Threat Protection Active</p>
                <div className="flex items-center gap-8">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> System Integrity High</span>
                    <Link href="/privacy" className="hover:text-primary-brand transition-colors flex items-center gap-1.5">Compliance Center <ExternalLink className="w-3 h-3" /></Link>
                </div>
            </footer>
        </div>
    );
}

function Monitor(props: any) {
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
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    )
}
