"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Code2,
    Settings,
    Palette,
    Maximize2,
    Save,
    RotateCcw,
    Layout,
    Type,
    Maximize
} from "lucide-react";

export function StyleEditor() {
    const [view, setView] = useState<"visual" | "code">("visual");

    const codeSnippet = `:root {
  --primary-brand: #8106D1;
  --font-heading: 'Outfit', sans-serif;
  --border-radius-xl: 1.5rem;
  --primary-shadow: 0 10px 15px -3px rgba(129, 6, 209, 0.1);
}

.hero-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 4rem;
  background: var(--primary-brand);
  border-radius: var(--border-radius-xl);
}`;

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            {/* Editor Header */}
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                <div className="flex items-center gap-4">
                    <div className="flex bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-1">
                        <button
                            onClick={() => setView("visual")}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-black transition-all ${view === 'visual' ? 'bg-primary-brand text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Palette className="w-3 h-3" /> Visual
                        </button>
                        <button
                            onClick={() => setView("code")}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-black transition-all ${view === 'code' ? 'bg-primary-brand text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Code2 className="w-3 h-3" /> Advanced Code
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-primary-brand transition-all shadow-sm">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="px-6 py-2.5 bg-primary-brand text-white rounded-xl text-xs font-black shadow-lg shadow-primary-brand/20 hover:scale-105 transition-all flex items-center gap-2">
                        <Save className="w-4 h-4" /> Apply Styles
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Property Inspector / Code Editor */}
                <div className="w-[450px] border-r border-slate-50 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900">
                    {view === "visual" ? (
                        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                            <section>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Global Styles</h4>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase">Border Radius</label>
                                        <div className="flex items-center gap-4">
                                            <input type="range" className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-brand" />
                                            <span className="text-xs font-black w-8 text-right">24px</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase">Shadow Intensity</label>
                                        <div className="flex items-center gap-4">
                                            <input type="range" className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-brand" />
                                            <span className="text-xs font-black w-8 text-right">15%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Typography</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                                        <Type className="w-4 h-4 text-primary-brand" />
                                        <p className="text-[10px] font-black uppercase text-slate-400">Headings</p>
                                        <p className="text-xs font-black">Outfit</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                                        <Layout className="w-4 h-4 text-primary-brand" />
                                        <p className="text-[10px] font-black uppercase text-slate-400">Layout</p>
                                        <p className="text-xs font-black">Responsive</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Theme Tokens</h4>
                                <div className="space-y-3">
                                    {['Primary', 'Secondary', 'Accent', 'Surface'].map(token => (
                                        <div key={token} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-lg ${token === 'Primary' ? 'bg-primary-brand shadow-lg ' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{token} Color</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">EDIT</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="flex-1 bg-[#0F172A] p-6 font-mono text-xs overflow-hidden flex flex-col">
                            <div className="flex items-center gap-2 mb-4 opacity-40">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="ml-4 text-[10px] font-bold tracking-widest uppercase">theme-definitions.css</span>
                            </div>
                            <textarea
                                className="flex-1 bg-transparent border-none outline-none text-slate-300 leading-relaxed resize-none selection:bg-primary-brand/30"
                                defaultValue={codeSnippet}
                            />
                        </div>
                    )}
                </div>

                {/* Right Panel: Interactive Preview */}
                <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-12 overflow-y-auto custom-scrollbar flex items-center justify-center">
                    <motion.div
                        layout
                        className="w-full max-w-lg aspect-[4/3] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative p-10 flex flex-col"
                    >
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary-brand flex items-center justify-center text-white">
                                <span className="material-icons text-sm">bolt</span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest">Instant<span className="text-primary-brand">Preview</span></p>
                        </div>
                        <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Live</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="h-0.5 w-8 bg-primary-brand rounded-full mb-6"></div>
                            <h2 className="text-3xl font-black mb-4 leading-tight">Elevate Your Presence.</h2>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xs mb-8">
                                Seamlessly integrated components for the next generation of builders.
                            </p>
                            <button className="px-8 py-3 bg-primary-brand text-white rounded-xl text-xs font-black shadow-xl shadow-primary-brand/20">
                                Get Started
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="absolute top-6 right-10 flex gap-4 text-slate-400">
                        <button className="flex items-center gap-1.5 hover:text-primary-brand transition-colors">
                            <Maximize2 className="w-4 h-4" /> <span className="text-[10px] font-black uppercase">Fullscreen</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
