"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    UserPlus,
    Users,
    Shield,
    MoreVertical,
    Mail,
    Crown,
    Trash2,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    ShieldAlert,
    Palette,
    Globe,
    Lock
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SettingsSidebar } from "@/components/settings-sidebar";

const initialMembers = [
    { id: 1, name: "Alex Rivera", email: "alex@nexus.agency", role: "Owner", status: "active", avatar: "https://i.pravatar.cc/150?u=alex" },
    { id: 2, name: "Sarah Chen", email: "sarah@nexus.agency", role: "Admin", status: "active", avatar: "https://i.pravatar.cc/150?u=sarah" },
    { id: 3, name: "Marcus Miller", email: "marcus@nexus.agency", role: "Editor", status: "pending", avatar: "https://i.pravatar.cc/150?u=marcus" },
];

export default function TeamManagementPage() {
    const [members, setMembers] = useState(initialMembers);
    const [inviteEmail, setInviteEmail] = useState("");

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
                        <h1 className="text-xl font-black tracking-tight">Team & Permissions</h1>
                        <p className="text-xs font-bold text-slate-400">Manage your agency collaborators and access levels</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                        <UserPlus className="w-4 h-4" /> Invite Member
                    </button>
                </div>
            </header>

            <main className="p-10 lg:p-14 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Settings Sidebar */}
                    <SettingsSidebar />

                    <div className="lg:col-span-8 space-y-12">
                        {/* Search & Invite Bar */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary-brand/10 outline-none transition-all"
                                    placeholder="Enter colleague email address..."
                                />
                            </div>
                            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 text-xs font-black outline-none focus:ring-2 focus:ring-primary-brand/10">
                                <option>Admin Access</option>
                                <option>Editor Access</option>
                                <option>Viewer only</option>
                            </select>
                            <button className="bg-primary-brand text-white px-8 py-3.5 rounded-2xl text-sm font-black shadow-lg shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all">
                                Send Invitation
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 px-4">Active Members</h3>
                                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden">
                                    {members.map((member) => (
                                        <motion.div
                                            key={member.id}
                                            layout
                                            className="p-8 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-md">
                                                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <p className="font-black text-lg">{member.name}</p>
                                                        {member.role === 'Owner' && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                                                        {member.status === 'pending' && (
                                                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest">Pending</span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-bold text-slate-400">{member.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-12 text-right">
                                                <div className="hidden sm:block">
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Permission Tier</p>
                                                    <div className="flex items-center gap-1.5 justify-end">
                                                        <Shield className="w-3 h-3 text-primary-brand" />
                                                        <span className="text-xs font-black">{member.role}</span>
                                                    </div>
                                                </div>
                                                <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 px-4">Role Insights</h3>
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
                                    <div className="space-y-4">
                                        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl"></div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                <h4 className="text-sm font-black">Admin Access</h4>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed">
                                                Full platform access including billing and project deletion. Recommended only for senior partners.
                                            </p>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl"></div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <Shield className="w-5 h-5 text-blue-500" />
                                                <h4 className="text-sm font-black">Editor Access</h4>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed">
                                                Can build new sites and manage existing drafts but cannot access agency billing or team settings.
                                            </p>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-transparent relative overflow-hidden group">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Clock className="w-5 h-5 text-slate-400" />
                                                <h4 className="text-sm font-black text-slate-400">Viewer Only</h4>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed opacity-50">
                                                Read-only access to analytics and site previews. Best for client reporting.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 flex items-center justify-center text-primary-brand mb-4">
                                            <ShieldAlert className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-sm font-black mb-2">Security Audit</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mb-6 px-4">
                                            Team activity is logged every 5 minutes. View your audit trails in the security console.
                                        </p>
                                        <Link href="/dashboard/settings/security">
                                            <button className="w-full py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                                                View Audit Logs
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 p-12 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                <p>© 2024 Team Engine • Node: 771-T-09</p>
                <div className="flex items-center gap-10">
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Auth Systems Healthy
                    </span>
                    <a href="#" className="hover:text-primary-brand transition-colors">SSO Config</a>
                </div>
            </footer>
        </div>
    );
}
