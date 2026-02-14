
import { Zap, Plus, Workflow } from "lucide-react";
import { AutomationCard } from "@/components/admin/automation-card";
import { MOCK_AUTOMATIONS } from "@/lib/automation-engine";

export default function AdminAutomationsPage() {
    return (
        <div className="space-y-12 pb-32">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                        <Workflow className="w-8 h-8 text-purple-600" />
                        Sovereign Protocols
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Automated Governance & Response Systems
                    </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20">
                    <Plus className="w-5 h-5" />
                    <span>Create Protocol</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {MOCK_AUTOMATIONS.map((rule) => (
                    <AutomationCard key={rule.id} rule={rule} />
                ))}

                {/* Empty State / Add New Placeholder */}
                <button className="group relative overflow-hidden rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex flex-col items-center justify-center gap-4 min-h-[300px]">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
                        <Plus className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold text-slate-900 dark:text-white">New Logic</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Define a new Trigger / Action pair</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
