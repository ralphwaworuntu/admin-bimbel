import { getAllUsers } from "@/lib/db";
import { UsersTable } from "@/components/admin/users-table";
import { Shield } from "lucide-react";

export default async function AdminUsersPage() {
    const users = await getAllUsers();

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Nexus Directory</h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Identity Clearance & Hive Lattice Management
                    </p>
                </div>
                <div className="flex items-center gap-4 px-6 py-3 bg-purple-600/5 rounded-2xl border border-purple-600/10">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div className="text-right">
                        <p className="text-xs font-black">{users.length} Latent Nodes</p>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Total Identities</p>
                    </div>
                </div>
            </header>

            <UsersTable users={users} />
        </div>
    );
}
