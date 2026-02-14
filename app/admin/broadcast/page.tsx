import { BroadcastComposer } from "@/components/admin/broadcast-composer";
import { sendBroadcastAction } from "@/app/admin/actions";
import { getActiveBroadcasts } from "@/lib/db";
import { Megaphone, History, Info, AlertTriangle, ShieldAlert } from "lucide-react";

export default async function AdminBroadcastPage() {
    const recentBroadcasts = await getActiveBroadcasts();

    return (
        <div className="space-y-12 pb-32">
            <header>
                <h1 className="text-3xl font-black tracking-tight mb-2">Communication Nexus</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Propagate Platform Intent Across the Lattice
                </p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                <div className="xl:col-span-2">
                    <BroadcastComposer onSend={sendBroadcastAction} />
                </div>

                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                            <History className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">Recent Manifests</h3>
                    </div>

                    <div className="space-y-4">
                        {recentBroadcasts.length === 0 ? (
                            <div className="p-10 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No active broadcasts</p>
                            </div>
                        ) : (
                            recentBroadcasts.map((bc) => (
                                <div key={bc.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 space-y-3 group hover:border-amber-500/30 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {bc.type === "alert" ? <AlertTriangle className="w-3 h-3 text-amber-500" /> :
                                                bc.priority === "critical" ? <ShieldAlert className="w-3 h-3 text-red-500" /> :
                                                    <Info className="w-3 h-3 text-blue-500" />}
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{bc.type}</span>
                                        </div>
                                        <span className="text-[8px] font-bold text-slate-400">{new Date(bc.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="text-sm font-black group-hover:text-amber-500 transition-colors uppercase">{bc.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-500 line-clamp-2 italic">{bc.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
