import { getAllSitesWithOwners } from "@/lib/db";
import { SitesTable } from "@/components/admin/sites-table";
import { Globe } from "lucide-react";

export default async function AdminSitesPage() {
    const sites = await getAllSitesWithOwners();

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Hive Ecosystem</h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Deployment Matrix & Sovereignty Hub
                    </p>
                </div>
                <div className="flex items-center gap-4 px-6 py-3 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                    <Globe className="w-5 h-5 text-amber-500" />
                    <div className="text-right">
                        <p className="text-xs font-black">{sites.length} Active Nodes</p>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Total Deployments</p>
                    </div>
                </div>
            </header>

            <SitesTable sites={sites} />
        </div>
    );
}
