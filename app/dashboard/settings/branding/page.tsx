"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    Palette,
    Monitor,
    Globe,
    Shield,
    Save,
    Upload,
    Layout,
    Type,
    Check,
    Zap,
    Lock
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SettingsSidebar } from "@/components/settings-sidebar";

export default function AgencyBrandingPage() {
    const [primaryColor, setPrimaryColor] = useState("#8106D1");
    const [agencyName, setAgencyName] = useState("Nexus Digital Agency");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

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
                        <h1 className="text-xl font-black tracking-tight">Agency White-labeling</h1>
                        <p className="text-xs font-bold text-slate-400">Customize the platform for your clients</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-3 bg-primary-brand text-white rounded-2xl text-xs font-black shadow-xl shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {isSaving ? "Settings Applied" : "Save Changes"}
                    </button>
                </div>
            </header>

            <main className="p-10 lg:p-14 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Settings Sidebar */}
                    <SettingsSidebar />

                    {/* Main Settings Form */}
                    <div className="lg:col-span-8 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-10"
                        >
                            <section>
                                <h3 className="text-xl font-black mb-1">Company Details</h3>
                                <p className="text-sm font-bold text-slate-400 mb-8">This name will appear on the login screen and header.</p>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Agency Name</label>
                                        <input
                                            value={agencyName}
                                            onChange={(e) => setAgencyName(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-primary-brand/20 transition-all"
                                            placeholder="Enter your agency name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Branding Color</label>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-14 h-14 rounded-2xl shadow-lg ring-4 ring-slate-100 dark:ring-slate-800 relative cursor-pointer"
                                                    style={{ backgroundColor: primaryColor }}
                                                >
                                                    <input
                                                        type="color"
                                                        value={primaryColor}
                                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                                <input
                                                    value={primaryColor}
                                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 font-bold uppercase"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dashboard Theme</label>
                                            <div className="flex bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700">
                                                <button className="flex-1 py-2 bg-white dark:bg-slate-700 rounded-xl text-[10px] font-black shadow-sm">LIGHT</button>
                                                <button className="flex-1 py-2 text-slate-400 text-[10px] font-black">DARK</button>
                                                <button className="flex-1 py-2 text-slate-400 text-[10px] font-black">SYSTEM</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-1">Logo & Icons</h3>
                                <p className="text-sm font-bold text-slate-400 mb-8">Recommended size: 512x512px (PNG or SVG with transparency).</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary-brand transition-all">
                                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center text-primary-brand mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Main Agency Logo</p>
                                    </div>

                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary-brand transition-all">
                                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center text-primary-brand mb-4 group-hover:scale-110 transition-transform">
                                            <Monitor className="w-6 h-6" />
                                        </div>
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Favicon (32x32)</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-black mb-1">Preview</h3>
                                <div className="mt-8 p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50">
                                    <div className="w-full h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center px-4 justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-primary-brand" style={{ backgroundColor: primaryColor }}></div>
                                            <span className="text-[10px] font-black">{agencyName}</span>
                                        </div>
                                        <div className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                                        <div className="h-32 w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"></div>
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 p-12 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                <p>© 2024 {agencyName} Infrastructure • White-label Mode Active</p>
            </footer>
        </div>
    );
}
