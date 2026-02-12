"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Send, Share2, Mail, Layout, Sparkles, Wand2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ContentStudio() {
    const [activeTab, setActiveTab] = useState<"blog" | "social" | "email">("blog");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedContent("");
        // Simulate AI generation
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mocks = {
            blog: "### The Future of Digital Infrastructure\n\nIn today's fast-paced world, speed is everything. Our latest platform update brings 200ms global propagation, ensuring your vision reaches every corner of the globe instantly...",
            social: "🚀 Big news! We've just launched our new edge-native platform. Experience the future of web building with InstantEngine. #WebDev #TechInnovation #FutureReady",
            email: "Subject: Your vision, now at the Edge\n\nHi there,\n\nWe're excited to announce that your workspace is now fully optimized for global distribution. Your sites are now serving from 300+ edge nodes..."
        };

        setGeneratedContent(mocks[activeTab]);
        setIsGenerating(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col h-full min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 flex items-center justify-center text-primary-brand">
                        <Wand2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black">Content Studio Pro</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">AI Multi-channel engine</p>
                    </div>
                </div>
                <div className="flex gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl">
                    {[
                        { id: 'blog', icon: <Layout className="w-3.5 h-3.5" /> },
                        { id: 'social', icon: <Share2 className="w-3.5 h-3.5" /> },
                        { id: 'email', icon: <Mail className="w-3.5 h-3.5" /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`p-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 text-primary-brand shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab.icon}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-6">
                <div className="relative flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 p-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!generatedContent && !isGenerating ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-300">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-400">Ready to synthesize content?</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">Based on your brand identity</p>
                                </div>
                            </motion.div>
                        ) : isGenerating ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center space-y-6"
                            >
                                <div className="relative">
                                    <div className="w-20 h-20 border-4 border-primary-brand/10 border-t-primary-brand rounded-full animate-spin"></div>
                                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary-brand animate-pulse" />
                                </div>
                                <p className="text-xs font-black text-primary-brand uppercase tracking-[0.3em] animate-pulse">Sythesizing {activeTab}...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="h-full"
                            >
                                <textarea
                                    readOnly
                                    className="w-full h-full bg-transparent border-none focus:ring-0 text-sm font-medium leading-relaxed resize-none text-slate-600 dark:text-slate-300 custom-scrollbar"
                                    value={generatedContent}
                                />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <Button
                                        onClick={copyToClipboard}
                                        size="sm"
                                        variant="outline"
                                        className="rounded-xl h-9 px-4 border-slate-200 bg-white shadow-sm flex items-center gap-2"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span className="text-[10px] font-black uppercase tracking-widest">{copied ? 'Copied' : 'Copy'}</span>
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full h-14 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
                    >
                        <PenTool className="w-4 h-4" />
                        Regenerate
                    </Button>
                    <Link href="/dashboard/sites" className="w-full">
                        <Button
                            className="w-full h-14 bg-primary-brand text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary-brand/20"
                        >
                            <Send className="w-4 h-4" />
                            Publish to Site
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
