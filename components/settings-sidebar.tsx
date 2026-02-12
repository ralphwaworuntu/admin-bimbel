"use client";

import { Palette, Shield, Lock, Globe, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { id: "branding", label: "Visual Identity", icon: Palette, path: "/dashboard/settings/branding" },
        { id: "domains", label: "Domain Mapping", icon: Globe, path: "/dashboard/settings/domains" },
        { id: "team", label: "Team & Access", icon: Shield, path: "/dashboard/settings/team" },
        { id: "security", label: "Security & Logs", icon: Lock, path: "/dashboard/settings/security" },
    ];

    return (
        <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-2 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.id} href={item.path} className="w-full">
                            <button
                                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all text-left ${isActive
                                    ? "bg-primary-brand/5 text-primary-brand border border-primary-brand/10"
                                    : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" /> {item.label}
                            </button>
                        </Link>
                    );
                })}
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group border border-slate-800 shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-brand/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                        <Zap className="w-5 h-5 text-primary-brand" />
                    </div>
                    <h4 className="font-black mb-2">Agency Pro Max</h4>
                    <p className="text-xs font-bold opacity-60 leading-relaxed mb-6">You have unlimited client workspace seats available.</p>
                    <Link href="/dashboard/billing">
                        <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-brand hover:text-white transition-all">View Usage Stats</button>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
