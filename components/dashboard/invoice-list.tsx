
import { FileText } from "lucide-react";

export function InvoiceList({ invoices }: { invoices: any[] }) {
    if (invoices.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-50 dark:bg-white/5 rounded-2xl">
                <p className="text-slate-400 font-bold">No invoices found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-black">${inv.amount / 100}.00 USD</p>
                            <p className="text-[10px] font-bold text-slate-400">{new Date(inv.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest rounded-full">
                            {inv.status}
                        </span>
                        <a href={inv.pdfUrl} className="text-xs font-bold text-purple-600 hover:underline">
                            Download
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
