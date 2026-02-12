"use client";

import { motion } from "framer-motion";
import {
    Globe,
    ExternalLink,
    Plus,
    Terminal,
    ShieldCheck,
    Server,
    Activity,
    Search,
    ChevronRight,
    Play,
    RotateCcw,
    Settings2,
    Zap
} from "lucide-react";
import Link from "next/link";

const deploymentLogs = [
    { time: "22:04:15", event: "Node AP-SOUTH-1 synchronized with global mesh", type: "success" },
    { time: "22:04:12", event: "Optimizing cache headers for 'Luxury Estate v2'", type: "info" },
    { time: "22:04:08", event: "Auto-healing protocol initiated for node US-EAST-1", type: "warning" },
    { time: "22:03:55", event: "Deployment successful: 'Quantum Portal' build #882", type: "success" },
];

const instances = [
    { id: 1, name: "Luxury Estate v2", region: "US-EAST-1", status: "Running", uptime: "99.99%", load: "12%" },
    { id: 2, name: "Quantum Portal", region: "EU-WEST-1", status: "Running", uptime: "100.00%", load: "45%" },
    { id: 3, name: "Prism Labs", region: "AP-SOUTH-1", status: "Provisioning", uptime: "0.00%", load: "0%" },
];

export default function DeploymentsPage() {
    return (
        <div className="p-8 lg:p-12 space-y-12 pb-32">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Deployments</h1>
                    <p className="text-slate-500 font-bold flex items-center gap-2">
                        Manage your global autonomous infrastructure.
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                            <Server className="w-3 h-3" /> Global Mesh Active
                        </span>
                    </p>
                </div>
                <Link href="/wizard">
                    <button className="bg-primary-brand text-white px-8 py-4 rounded-2xl text-xs font-black flex items-center gap-3 shadow-xl shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                        <Plus className="w-4 h-4" /> New Deployment
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Live Activity Logs */}
                <div className="xl:col-span-1 bg-slate-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden h-[600px] flex flex-col">
                    <div className="flex items-center gap-3 mb-8 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400">
                            <Terminal className="w-5 h-5" />
                        </div>
                        <Link href="/dashboard/guardian">
                            <h3 className="text-white font-black text-lg tracking-tight hover:text-primary-brand transition-colors">Deploy Logs</h3>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Real-time Stream</p>
                        </Link>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                        {deploymentLogs.map((log, i) => (
                            <div key={i} className="font-mono text-[10px] flex gap-4 text-slate-500 border-l border-white/5 pl-4 py-1 hover:border-primary-brand/50 transition-colors cursor-default">
                                <span className="text-slate-600 shrink-0">{log.time}</span>
                                <span className={log.type === 'warning' ? 'text-amber-500' : log.type === 'success' ? 'text-emerald-500' : 'text-slate-300'}>
                                    {log.event}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                        <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Streaming autonomous events...</span>
                        </div>
                    </div>
                </div>

                {/* Instance Management Master */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search instances..."
                                        className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2.5 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary-brand/20 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-900 transition-all border border-slate-100 dark:border-slate-700">
                                    <Settings2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50 dark:border-slate-800">
                                        <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Instance</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Region</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Health</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {instances.map((instance, i) => (
                                        <tr key={instance.id} className="group border-b border-slate-50 dark:border-slate-800 last:border-none hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                        <Globe className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black">{instance.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: #00{instance.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{instance.region}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${instance.status === 'Running' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                                                    <div className={`w-1 h-1 rounded-full ${instance.status === 'Running' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
                                                    <span className="text-[9px] font-black uppercase tracking-widest">{instance.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center justify-between text-[8px] font-black uppercase text-slate-400">
                                                        <span>Sync</span>
                                                        <span>{instance.uptime}</span>
                                                    </div>
                                                    <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: instance.uptime }}
                                                            className="h-full bg-primary-brand"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary-brand transition-all">
                                                        <RotateCcw className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary-brand transition-all"
                                                        onClick={() => window.open(`http://localhost:3000/sites/${instance.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                            <Link href="/dashboard/guardian" className="flex items-center gap-4 mb-6 hover:opacity-70 transition-opacity">
                                <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 flex items-center justify-center text-primary-brand">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-black">Auto-Healing Protocols</h4>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">3 active guardrails</p>
                                </div>
                            </Link>
                            <div className="space-y-3">
                                {[
                                    { label: "DDoS Mitigation", status: "Active" },
                                    { label: "Node Auto-Scaling", status: "Active" },
                                    { label: "Cache Warp V3", status: "Optimizing" },
                                ].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full">{p.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <Zap className="w-24 h-24" />
                            </div>
                            <h4 className="text-xl font-black mb-2">Instant Engine V5</h4>
                            <p className="text-slate-400 text-xs font-bold mb-6">Experience zero-latency deployments with our new global edge compute mesh.</p>
                            <Link href="/nexus">
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary-brand hover:underline">
                                    Explore Engine Specs <ChevronRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
