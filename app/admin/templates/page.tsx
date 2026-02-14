import { templates } from "@/lib/mock-data";
import { getTemplateAdoptionStats } from "@/lib/db";
import { TemplateGrid } from "@/components/admin/template-grid";
import { Layout, BarChart2, Star, Zap } from "lucide-react";

export default async function AdminTemplatesPage() {
    const adoptionStats = await getTemplateAdoptionStats();

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Blueprint Sovereign</h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Template Hierarchy & Architectural Manifests
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center gap-4 px-8 py-4 bg-purple-600/5 rounded-[1.5rem] border border-purple-600/10">
                        <Layout className="w-5 h-5 text-purple-600" />
                        <div className="text-right">
                            <p className="text-xl font-black">{templates.length}</p>
                            <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Main Blueprints</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-8 py-4 bg-emerald-500/5 rounded-[1.5rem] border border-emerald-500/10">
                        <BarChart2 className="w-5 h-5 text-emerald-500" />
                        <div className="text-right">
                            <p className="text-xl font-black">4.9</p>
                            <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Avg Fidelity</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Platform Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="bg-slate-950 rounded-[2.5rem] border border-white/5 p-10 flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Zap className="w-32 h-32 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-8">Architectural Health</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Unit Synchronization', val: '100%', color: 'bg-emerald-500' },
                                { label: 'Style Engine Version', val: 'v2.4', color: 'bg-blue-500' },
                                { label: 'Module Compatibility', val: '99.2%', color: 'bg-purple-600' },
                            ].map(item => (
                                <div key={item.label} className="space-y-2">
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">{item.label}</span>
                                        <span className="text-white">{item.val}</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: item.val }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-10">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black tracking-tight">Deployment Adoption</h3>
                        <span className="text-[8px] font-black uppercase tracking-widest text-amber-600 bg-amber-600/10 px-3 py-1.5 rounded-full border border-amber-600/20">
                            Market Analysis
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {templates.slice(0, 4).map(t => (
                            <div key={t.id} className="p-6 rounded-[1.5rem] bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 flex flex-col items-center text-center">
                                <p className="text-xl font-black mb-1">{adoptionStats[t.id] || 0}</p>
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 truncate w-full">{t.name}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <TemplateGrid templates={templates} adoptionStats={adoptionStats} />
        </div>
    );
}
