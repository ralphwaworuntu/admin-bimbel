"use client";
import Link from "next/link";
import { Zap, ArrowLeft, Network, Shield, Database, Globe, ShoppingCart, Mail, BarChart3, Cloud, Lock, Server } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const plugins = [
    { id: "stripe", name: "Stripe Connect", category: "Payments", icon: ShoppingCart, installed: true, desc: "Accept payments globally with ease." },
    { id: "seo", name: "SEO Auto-Pilot", category: "Marketing", icon: Globe, installed: true, desc: "Automated meta tags and sitemap generation." },
    { id: "analytics", name: "Nexus Analytics", category: "Analytics", icon: BarChart3, installed: false, desc: "Privacy-first traffic insights." },
    { id: "sendgrid", name: "SendGrid Email", category: "Communication", icon: Mail, installed: false, desc: "Transactional email delivery infrastructure." },
    { id: "s3", name: "AWS S3 Storage", category: "Storage", icon: Cloud, installed: false, desc: "Scalable object storage for assets." },
    { id: "auth0", name: "Auth0 Identity", category: "Security", icon: Lock, installed: false, desc: "Enterprise-grade authentication." },
    { id: "redis", name: "Upstash Redis", category: "Database", icon: Database, installed: false, desc: "Low latency data caching." },
    { id: "cloudflare", name: "Cloudflare CDN", category: "Performance", icon: Server, installed: true, desc: "Edge caching and DDoS protection." },
];

export default function NexusPage() {
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Payments", "Marketing", "Analytics", "Security", "Database"];
    const filteredPlugins = filter === "All" ? plugins : plugins.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-primary-brand/30">
            {/* Background Pulse */}
            <div className="fixed inset-0 bg-primary-brand/5 blur-[150px] animate-pulse pointer-events-none"></div>

            <nav className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-xl z-50">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard">
                        <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Network className="w-6 h-6 text-primary-brand" />
                        <h1 className="text-xl font-black tracking-tight">NEXUS<span className="text-primary-brand">.MARKET</span></h1>
                    </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-primary-brand/10 border border-primary-brand/20 text-xs font-bold text-primary-brand flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-brand animate-pulse"></div>
                    System v2.4 Live
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-8 relative z-10">
                <header className="py-12 text-center max-w-3xl mx-auto">
                    <h2 className="text-5xl font-black mb-6 tracking-tight">Expand your <span className="text-primary-brand">Infrastructure</span>.</h2>
                    <p className="text-slate-400 text-lg">
                        Install one-click modules to supercharge your WaaS platform.
                        No code required. seamless integration.
                    </p>
                </header>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${filter === cat
                                    ? "bg-white text-slate-900"
                                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlugins.map((plugin, i) => (
                        <motion.div
                            key={plugin.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition-all group hover:border-primary-brand/30"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plugin.installed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                                    <plugin.icon className="w-6 h-6" />
                                </div>
                                {plugin.installed ? (
                                    <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                                        Active
                                    </span>
                                ) : (
                                    <button className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-primary-brand hover:text-white transition-colors">
                                        Install
                                    </button>
                                )}
                            </div>

                            <h3 className="text-lg font-bold mb-2">{plugin.name}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4 min-h-[40px]">{plugin.desc}</p>

                            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-slate-500">
                                <span>{plugin.category}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                <span>v1.0.2</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
