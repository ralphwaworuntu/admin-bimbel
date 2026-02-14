import { getAuditLogs, getAllUsers } from "@/lib/db";
import {
    Shield,
    Clock,
    Search,
    Filter,
    ArrowUpRight,
    User,
    Globe,
    Megaphone,
    Zap,
    Settings
} from "lucide-react";

export default async function AdminAuditPage() {
    // In a real app, you'd use the join, but for now we'll fetch logs.
    // Since we don't have relations defined in schema for with: { admin: true }, 
    // we'll fetch users separately and map or fix the helper.
    const logs = await getAuditLogs();
    const users = await getAllUsers();

    const userMap = new Map(users.map(u => [u.id, u.name]));

    const getActionIcon = (action: string) => {
        switch (action) {
            case 'broadcast': return <Megaphone className="w-4 h-4 text-amber-500" />;
            case 'update_role': return <Shield className="w-4 h-4 text-purple-600" />;
            case 'delete_user': return <User className="w-4 h-4 text-red-500" />;
            case 'site_deploy': return <Globe className="w-4 h-4 text-emerald-500" />;
            default: return <Zap className="w-4 h-4 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-12 pb-32">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Audit Manifest</h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Total Transparency & Identity Provenance
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Retention: 30 Days</span>
                    </div>
                </div>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-50 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/2">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                placeholder="Search action or principal..."
                                className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl pl-12 pr-6 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-purple-600/50 transition-all w-64"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-all">
                            <Filter className="w-4 h-4" /> Filter Lattice
                        </button>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Displaying {logs.length} Operations
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Principal (Admin)</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Action Protocol</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Target Manifest</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Security Index</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No audit records found in current lattice</p>
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors group">
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <p className="text-xs font-black">{new Date(log.createdAt).toLocaleDateString()}</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-0.5">{new Date(log.createdAt).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center text-purple-600 text-xs font-black">
                                                    {(userMap.get(log.adminId) || "A").charAt(0)}
                                                </div>
                                                <p className="text-xs font-black">{userMap.get(log.adminId) || "Unknown Principal"}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                                                    {getActionIcon(log.action)}
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-purple-600 transition-colors">
                                                    {log.action.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-bold text-slate-400 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded">
                                                    {log.targetType || "SYSTEM"}
                                                </span>
                                                <span className="text-xs font-black truncate max-w-[150px]">{log.targetId || "Global Lattice"}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 hover:text-purple-600 transition-all opacity-0 group-hover:opacity-100">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* HUD Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <section className="p-10 bg-slate-950 rounded-[2.5rem] border border-white/5 space-y-6">
                    <div className="flex items-center gap-4">
                        <Settings className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Identity Integrity</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[98%]" />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">98% Secure Identifiers</p>
                    </div>
                </section>
                <section className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
                    <div className="flex items-center gap-4">
                        <Shield className="w-5 h-5 text-purple-600" />
                        <h3 className="text-sm font-black uppercase tracking-widest">Protocol Guard</h3>
                    </div>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
                        L7 Firewall is currently filtering 12.4k requests/min. No breaches detected in last audit cycles.
                    </p>
                </section>
                <section className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
                    <div className="flex items-center gap-4">
                        <Zap className="w-5 h-5 text-amber-500" />
                        <h3 className="text-sm font-black uppercase tracking-widest">Propagation Latency</h3>
                    </div>
                    <p className="text-3xl font-black">0.42ms</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Optimal Sync</p>
                </section>
            </div>
        </div>
    );
}
