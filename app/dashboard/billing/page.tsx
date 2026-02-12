"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    CreditCard,
    Download,
    ExternalLink,
    ShieldCheck,
    Zap,
    TrendingUp,
    History,
    AlertCircle,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const invoices = [
    { id: "INV-2024-001", date: "Jan 12, 2024", amount: "$299.00", status: "paid" },
    { id: "INV-2024-002", date: "Feb 12, 2024", amount: "$299.00", status: "paid" },
    { id: "INV-2024-003", date: "Mar 12, 2024", amount: "$299.00", status: "pending" },
];

export default function BillingPage() {
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
                        <h1 className="text-xl font-black tracking-tight">Billing & Subscriptions</h1>
                        <p className="text-xs font-bold text-slate-400">Manage your agency tier and invoices</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black border border-slate-100 dark:border-slate-700 hover:bg-slate-100 transition-all">
                        Change Currency
                    </button>
                </div>
            </header>

            <main className="p-10 lg:p-14 max-w-7xl mx-auto space-y-12">
                {/* Active Plan Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >
                    <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl border border-slate-800">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-brand/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-12 justify-between">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-brand/20 border border-primary-brand/30">
                                    <div className="w-2 h-2 rounded-full bg-primary-brand animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-brand">Agency Pro Plus</span>
                                </div>
                                <div>
                                    <h2 className="text-5xl font-black tracking-tight mb-2">$299<span className="text-xl opacity-40">/month</span></h2>
                                    <p className="text-slate-400 font-bold">Your next billing date is <span className="text-white">April 12, 2024</span></p>
                                </div>
                                <div className="flex flex-wrap gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Seats</p>
                                        <p className="text-xl font-black">Unlimited</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Sites</p>
                                        <p className="text-xl font-black">42 / ∞</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Storage</p>
                                        <p className="text-xl font-black">1.2 TB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-64 space-y-4">
                                <Link href="/dashboard/settings">
                                    <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-sm shadow-xl hover:bg-primary-brand hover:text-white transition-all">
                                        Upgrade Tier
                                    </button>
                                </Link>
                                <button className="w-full py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-black text-sm border border-white/10 hover:bg-white/20 transition-all">
                                    Manage Payment Method
                                </button>
                                <p className="text-[10px] text-center font-black opacity-30 uppercase tracking-[0.2em] pt-4">Nexus Infrastructure v4.2</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-14 h-14 rounded-3xl bg-primary-brand/5 border border-primary-brand/10 flex items-center justify-center text-primary-brand mb-8">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight">Enterprise Compliance</h3>
                            <p className="text-sm font-bold text-slate-400 leading-relaxed">
                                Your current plan includes SOC2 Type II compliance reports and dedicated infrastructure support.
                            </p>
                        </div>
                        <Link href="/privacy" className="text-xs font-black text-primary-brand flex items-center gap-2 group hover:underline underline-offset-4">
                            View Compliance Docs <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* Usage Stats Section */}
                <section className="space-y-8">
                    <h3 className="text-2xl font-black tracking-tight">Platform Usage</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { label: "API Requests", value: "1.2M", total: "5M", icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10", href: "/dashboard/deployments" },
                            { label: "Asset Storage", value: "840GB", total: "2TB", icon: Briefcase, color: "text-amber-500", bg: "bg-amber-500/10", href: "/dashboard/sites" },
                            { label: "Monthly Transfer", value: "4.8TB", total: "10TB", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/dashboard/economics" },
                        ].map((metric) => (
                            <Link key={metric.label} href={metric.href} className="block group">
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary-brand/30 transition-all h-full">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={`${metric.bg} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                                            <metric.icon className={`w-6 h-6 ${metric.color}`} />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400">{(parseFloat(metric.value) / parseFloat(metric.total) * 100).toFixed(0)}% USED</span>
                                    </div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{metric.label}</h4>
                                    <p className="text-2xl font-black mb-6">{metric.value} <span className="text-sm opacity-30">/ {metric.total}</span></p>
                                    <div className="h-2 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(parseFloat(metric.value) / parseFloat(metric.total) * 100)}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className={`h-full ${metric.color.replace('text', 'bg')}`}
                                        ></motion.div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Invoice History */}
                <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                <History className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">Invoice History</h3>
                        </div>
                        <button className="text-xs font-black text-primary-brand hover:underline">Download All (CSV)</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-10 py-6">Invoice ID</th>
                                    <th className="px-10 py-6">Date</th>
                                    <th className="px-10 py-6">Amount</th>
                                    <th className="px-10 py-6">Status</th>
                                    <th className="px-10 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                        <td className="px-10 py-8 font-black text-sm">{invoice.id}</td>
                                        <td className="px-10 py-8 font-bold text-sm text-slate-500">{invoice.date}</td>
                                        <td className="px-10 py-8 font-black text-sm">{invoice.amount}</td>
                                        <td className="px-10 py-8">
                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${invoice.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl hover:bg-primary-brand hover:text-white transition-all shadow-sm">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <footer className="mt-20 p-12 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                <p>© 2024 Nexus Pay • Secure Stripe Integration</p>
                <div className="flex items-center gap-8">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> All Payment Systems Active</span>
                    <a href="#" className="hover:text-primary-brand transition-colors">Tax Policy</a>
                </div>
            </footer>
        </div>
    );
}
