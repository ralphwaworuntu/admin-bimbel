
import { getAllSitesWithOwners } from "@/lib/db";
import { MultiverseGrid } from "@/components/admin/multiverse-grid";
import { Globe, Server, Layers } from "lucide-react";

export default async function AdminMultiversePage() {
    const sites = await getAllSitesWithOwners();

    return (
        <div className="space-y-12 pb-32">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                        <Globe className="w-8 h-8 text-purple-600" />
                        Multi-Verse Grid
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Global Fleet Management & Mass Deployment
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <Server className="w-5 h-5 text-purple-500" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Nodes</span>
                            <span className="font-bold leading-none">{sites.length}</span>
                        </div>
                    </div>
                </div>
            </header>

            <MultiverseGrid sites={sites} />
        </div>
    );
}
