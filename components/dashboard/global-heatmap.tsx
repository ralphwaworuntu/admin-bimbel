"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Globe,
    Zap,
    TrendingUp,
    MousePointer2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const regions = [
    { id: "na", name: "North America", x: 200, y: 150, reach: "42.5%", intensity: 0.9, traffic: "1.2M" },
    { id: "eu", name: "Europe", x: 480, y: 130, reach: "18.2%", intensity: 0.6, traffic: "450k" },
    { id: "as", name: "Asia-Pacific", x: 750, y: 180, reach: "24.1%", intensity: 0.8, traffic: "780k" },
    { id: "sa", name: "South America", x: 280, y: 350, reach: "8.5%", intensity: 0.4, traffic: "120k" },
    { id: "af", name: "Africa", x: 490, y: 300, reach: "6.7%", intensity: 0.3, traffic: "90k" },
];

export function GlobalHeatmap() {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const router = useRouter();

    return (
        <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-white font-black text-xl tracking-tight">Active Reach Matrix</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Infrastructure Heatmap</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/10">
                        <Globe className="w-3 h-3 animate-spin-slow" /> Edge Active
                    </div>
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center min-h-0 bg-slate-950/20 rounded-[2rem] border border-white/5">
                {/* SVG Map Container */}
                <svg
                    viewBox="0 0 1000 500"
                    className="w-full h-full opacity-60 transition-opacity group-hover:opacity-80 duration-700"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Simplified World Outline (Background Decoration) */}
                    <g fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-800">
                        <path d="M150,150 Q250,100 350,150 T550,150 T750,150" />
                        <path d="M200,300 Q300,250 400,300 T600,300 T800,300" opacity="0.5" />
                    </g>

                    {/* Interaction Hotspots */}
                    {regions.map((region) => (
                        <g
                            key={region.id}
                            onMouseEnter={() => setHoveredRegion(region.id)}
                            onMouseLeave={() => setHoveredRegion(null)}
                            onClick={() => router.push('/dashboard/analytics')}
                            className="cursor-pointer group/node"
                        >
                            {/* Pulse Inner */}
                            <motion.circle
                                cx={region.x}
                                cy={region.y}
                                r={8}
                                fill="#8106D1"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            />
                            {/* Pulse Outer Layer 1 */}
                            <motion.circle
                                cx={region.x}
                                cy={region.y}
                                r={20}
                                stroke="#8106D1"
                                strokeWidth="1"
                                fill="transparent"
                                initial={{ scale: 1, opacity: 0.6 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                            />
                            {/* Pulse Outer Layer 2 */}
                            <motion.circle
                                cx={region.x}
                                cy={region.y}
                                r={15}
                                stroke="#8106D1"
                                strokeWidth="2"
                                fill="transparent"
                                initial={{ scale: 1, opacity: 0.8 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay: 0.5 }}
                            />

                            {/* Hover Shadow Highlight */}
                            <circle
                                cx={region.x}
                                cy={region.y}
                                r={40}
                                fill="transparent"
                            />
                        </g>
                    ))}
                </svg>

                {/* Interactive Tooltip Card */}
                <AnimatePresence>
                    {hoveredRegion && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute pointer-events-none p-4 lg:p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/20 rounded-[1.2rem] lg:rounded-[1.5rem] shadow-2xl z-20 min-w-[160px] lg:min-w-[200px]"
                            style={{
                                left: `${Math.min(regions.find(r => r.id === hoveredRegion)!.x / 10 + 2, 80).toString()}%`,
                                top: `${Math.max(regions.find(r => r.id === hoveredRegion)!.y / 5 - 20, 10).toString()}%`
                            }}
                        >
                            <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl bg-primary-brand/10 flex items-center justify-center text-primary-brand">
                                    <Zap className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                </div>
                                <h4 className="text-[11px] lg:text-sm font-black tracking-tight text-slate-900 dark:text-white truncate">
                                    {regions.find(r => r.id === hoveredRegion)!.name}
                                </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                <div className="min-w-0">
                                    <p className="text-[7px] lg:text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 truncate">Global Share</p>
                                    <p className="text-[10px] lg:text-xs font-black text-slate-900 dark:text-white">
                                        {regions.find(r => r.id === hoveredRegion)!.reach}
                                    </p>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[7px] lg:text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1 truncate">WAU</p>
                                    <p className="text-[10px] lg:text-xs font-black text-emerald-500">
                                        {regions.find(r => r.id === hoveredRegion)!.traffic}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Map Legend */}
                <div className="absolute bottom-6 right-6 p-4 bg-slate-950/40 backdrop-blur-md rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Optimized Node</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary-brand animate-pulse"></div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Growth Zone</span>
                    </div>
                </div>
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,6,209,0.05),transparent_70%)] pointer-events-none"></div>
        </div>
    );
}
