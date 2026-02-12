"use client";

import { motion } from "framer-motion";
import {
    Users,
    MessageSquare,
    Search,
    Heart,
    Share2,
    Plus,
    ArrowLeft,
    Layout,
    Globe
} from "lucide-react";
import Link from "next/link";

const communitySites = [
    { title: "Neo Portfolio", author: "Jordan S.", likes: 442, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" },
    { title: "Zest Delivery", author: "Maria K.", likes: 219, img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2689&auto=format&fit=crop" },
    { title: "CryptoFlow UI", author: "CryptoKing", likes: 890, img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop" },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-display">
            <nav className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50">
                <div className="flex items-center gap-6">
                    <Link href="/">
                        <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary-brand transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <h1 className="text-xl font-black">Community Center</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/wizard">
                        <button className="px-6 py-2.5 bg-primary-brand text-white rounded-xl text-xs font-black shadow-lg shadow-primary-brand/20 hover:scale-105 transition-all flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Share My Build
                        </button>
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-20">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-5xl font-black mb-6">Designed by the <span className="text-primary-brand">Community</span>.</h2>
                    <p className="text-lg text-slate-500 font-medium">Explore thousands of high-fidelity templates and custom builds created by the Nexus Digital community.</p>
                </div>

                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-4">
                        <Search className="w-5 h-5 text-slate-400" />
                        <input className="bg-transparent border-none outline-none w-full font-bold text-sm" placeholder="Search community templates..." />
                    </div>
                    <div className="flex bg-slate-50 dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-100 dark:border-slate-800">
                        {['Trending', 'Latest', 'Hall of Fame'].map(t => (
                            <button key={t} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${t === 'Trending' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary-brand' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {communitySites.map((site, i) => (
                        <motion.div
                            key={site.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-primary-brand/5 transition-all"
                        >
                            <div className="aspect-[1.6/1] overflow-hidden relative">
                                <img src={site.img} alt={site.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-primary-brand/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <Link href="/nexus">
                                        <button className="w-12 h-12 rounded-full bg-white text-primary-brand flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                                            <Globe className="w-5 h-5" />
                                        </button>
                                    </Link>
                                    <Link href="/nexus">
                                        <button className="w-12 h-12 rounded-full bg-white text-primary-brand flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                                            <Layout className="w-5 h-5" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h4 className="text-xl font-black">{site.title}</h4>
                                        <p className="text-xs font-bold text-slate-400">by {site.author}</p>
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black">
                                        <Heart className="w-3 h-3 fill-rose-500" /> {site.likes}
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <Link href="/nexus" className="flex-1">
                                        <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black hover:bg-primary-brand hover:text-white transition-all">Duplicate Build</button>
                                    </Link>
                                    <button className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-brand transition-all">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <section className="mt-40 p-20 bg-primary-brand rounded-[4rem] text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <Users className="w-20 h-20 mx-auto mb-8 opacity-50" />
                    <h3 className="text-4xl font-black mb-6">Connect with 100k+ Builders</h3>
                    <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Join the official Nexus Digital Discord and participate in weekly design challenges and hackathons.</p>
                    <button className="px-10 py-5 bg-white text-primary-brand rounded-2xl font-black text-sm shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto">
                        <MessageSquare className="w-5 h-5" /> Join the Discord
                    </button>
                </section>
            </main>

            <footer className="p-20 text-center border-t border-slate-50 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Powered by Nexus Digital Community Engine</p>
            </footer>
        </div>
    );
}
