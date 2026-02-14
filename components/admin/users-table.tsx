"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    User,
    ShieldAlert,
    Shield,
    Trash2,
    X,
    ExternalLink,
    Mail,
    Calendar,
    MoreHorizontal,
    Activity,
    Globe
} from "lucide-react";
import { toggleAdminRoleAction, deleteUserAction } from "@/app/admin/actions";

interface UsersTableProps {
    users: any[];
}

export function UsersTable({ users: initialUsers }: UsersTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [confirmAction, setConfirmAction] = useState<{ id: string, type: 'delete' | 'role', currentRole?: string } | null>(null);

    const filteredUsers = initialUsers.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || (user.role || "user") === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-6">
            {/* Filters Header */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Nexus users..."
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-purple-600/20 transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    {['all', 'admin', 'user'].map((role) => (
                        <button
                            key={role}
                            onClick={() => setRoleFilter(role)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${roleFilter === role
                                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-600/20"
                                : "bg-slate-50 dark:bg-slate-800 text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">User Profile</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Access Role</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Join Date</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Strategic Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="group hover:bg-slate-50 dark:hover:bg-white/2 transition-colors cursor-pointer"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10">
                                                {user.image ? (
                                                    <img src={user.image} alt={user.name!} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-5 h-5 text-slate-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black group-hover:text-purple-600 transition-colors">{user.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${user.role === 'admin'
                                            ? 'bg-purple-600/10 text-purple-600 border-purple-600/20'
                                            : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-white/5'
                                            }`}>
                                            {user.role === 'admin' ? <ShieldAlert className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                            {user.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => setConfirmAction({ id: user.id, type: 'role', currentRole: user.role || 'user' })}
                                                className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-purple-600 hover:bg-purple-600/10 transition-all border border-transparent hover:border-purple-600/20"
                                                title="Toggle Access Role"
                                            >
                                                <Shield className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setConfirmAction({ id: user.id, type: 'delete' })}
                                                className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                                                title="Purge User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="p-24 text-center">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black mb-1">No users found</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Nexus directory is clear for your search parameters</p>
                    </div>
                )}
            </div>

            {/* Interaction Modals & Drawers */}
            <AnimatePresence>
                {selectedUser && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedUser(null)}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white dark:bg-[#020617] border-l border-slate-100 dark:border-white/10 z-[101] flex flex-col shadow-[-30px_0_100px_rgba(0,0,0,0.3)]"
                        >
                            <div className="p-12 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-purple-600/10 flex items-center justify-center text-purple-600 border border-purple-600/20">
                                        <User className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight">{selectedUser.name}</h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sovereign Identity Card</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedUser(null)} className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-purple-600 transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Email Protocol</p>
                                        <p className="text-xs font-black truncate">{selectedUser.email}</p>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Clearance Level</p>
                                        <p className="text-xs font-black uppercase text-purple-600">{selectedUser.role || 'user'}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                                        <Activity className="w-4 h-4" /> Operational History
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-50 dark:border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black">Nexus Arrival</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Initial Onboarding</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500">{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-50 dark:border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                    <Globe className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black">Active Sites</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Deployment Count</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500">--</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Action Dialog */}
            <AnimatePresence>
                {confirmAction && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[200]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 flex items-center justify-center z-[201] p-6"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/10 p-12 max-w-md w-full shadow-2xl">
                                <div className={`w-16 h-16 rounded-[1.5rem] ${confirmAction.type === 'delete' ? 'bg-red-500/10 text-red-500' : 'bg-purple-600/10 text-purple-600'} flex items-center justify-center mx-auto mb-8`}>
                                    {confirmAction.type === 'delete' ? <Trash2 className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
                                </div>
                                <h3 className="text-2xl font-black text-center mb-4 truncate italic overflow-hidden">
                                    {confirmAction.type === 'delete' ? "Finalize Purge?" : "Elevate Access?"}
                                </h3>
                                <p className="text-slate-500 text-center text-sm leading-relaxed mb-10">
                                    {confirmAction.type === 'delete'
                                        ? "This operation will permanently disconnect the identity from the Nexus lattice and terminate all associated deployments."
                                        : `Confirm authorization adjustment for this identity clearance. New status will be ${confirmAction.currentRole === 'admin' ? 'USER' : 'ADMIN'}.`}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setConfirmAction(null)}
                                        className="py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                                    >
                                        Abort
                                    </button>
                                    <form
                                        className="w-full"
                                        action={async () => {
                                            if (confirmAction.type === 'delete') {
                                                await deleteUserAction(confirmAction.id);
                                            } else {
                                                await toggleAdminRoleAction(confirmAction.id, confirmAction.currentRole!);
                                            }
                                            setConfirmAction(null);
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className={`w-full py-4 rounded-2xl ${confirmAction.type === 'delete' ? 'bg-red-600' : 'bg-purple-600'} text-white shadow-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all`}
                                        >
                                            Confirm
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
