
import { getOracleInsights, getAllUsers } from "@/lib/db";
import {
    Activity,
    Brain,
    Zap,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Target,
    RefreshCw,
    Users
} from "lucide-react";
import { OracleControls } from "@/components/admin/oracle-controls";

export default async function AdminOraclePage() {
    const insights = await getOracleInsights(100);
    const users = await getAllUsers();
    const userMap = new Map(users.map(u => [u.id, u]));

    // Aggregations
    const churnRisks = insights.filter(i => i.type === "churn_risk");
    const opportunities = insights.filter(i => i.type === "upgrade_opportunity");
    const avgScore = insights.reduce((acc, curr) => acc + curr.score, 0) / (insights.length || 1);

    return (
        <div className="space-y-12 pb-32">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                        <Brain className="w-8 h-8 text-purple-600" />
                        Oracle Chamber
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Predictive Intelligence & Behavioral Lattice
                    </p>
                </div>
                <div className="flex gap-4">
                    <OracleControls />
                </div>
            </header>

            {/* Neural Lattice (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-slate-950 rounded-[2.5rem] border border-white/5 space-y-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-purple-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lattice Health</h3>
                        </div>
                        <span className="text-white font-black">{Math.round(avgScore)}/100</span>
                    </div>
                    <div className="space-y-2 relative z-10">
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${avgScore}%` }} />
                        </div>
                        <p className="text-[9px] font-bold text-slate-500">Global Engagement Index</p>
                    </div>
                </div>

                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <TrendingDown className="w-5 h-5 text-red-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Churn Radar</h3>
                        </div>
                        <span className="text-slate-900 dark:text-white font-black text-2xl">{churnRisks.length}</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">High-risk vectors detected</p>
                </div>

                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-emerald-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Opportunity Matrix</h3>
                        </div>
                        <span className="text-slate-900 dark:text-white font-black text-2xl">{opportunities.length}</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">Ready for upgrade</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Churn Radar List */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 dark:border-white/5 flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            At Risk
                        </h3>
                    </div>
                    <div className="p-4 space-y-2">
                        {churnRisks.slice(0, 5).map(insight => {
                            const user = userMap.get(insight.targetId);
                            return (
                                <div key={insight.id} className="group p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-transparent hover:border-slate-100 dark:hover:border-white/5 transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-black text-xs">
                                            {insight.score}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black">{user?.name || "Unknown Principal"}</p>
                                            <p className="text-[9px] font-bold text-slate-400">
                                                {(insight.payload as any)?.reasons?.[0] || "General inactivity"}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-black/20 text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-red-500 transition-colors">
                                        Intervene
                                    </button>
                                </div>
                            );
                        })}
                        {churnRisks.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-xs font-bold">
                                No immediate threats detected.
                            </div>
                        )}
                    </div>
                </div>

                {/* Opportunity Matrix List */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 dark:border-white/5 flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            Rising Stars
                        </h3>
                    </div>
                    <div className="p-4 space-y-2">
                        {opportunities.slice(0, 5).map(insight => {
                            const user = userMap.get(insight.targetId);
                            return (
                                <div key={insight.id} className="group p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-transparent hover:border-slate-100 dark:hover:border-white/5 transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-xs">
                                            {insight.score}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black">{user?.name || "Unknown Principal"}</p>
                                            <p className="text-[9px] font-bold text-slate-400">
                                                {(insight.payload as any)?.reasons?.[0] || "High engagement"}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-black/20 text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-500 transition-colors">
                                        Empower
                                    </button>
                                </div>
                            );
                        })}
                        {opportunities.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-xs font-bold">
                                No upgrade candidates found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
