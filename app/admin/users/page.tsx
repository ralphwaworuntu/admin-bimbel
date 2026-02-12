import { getAllUsers } from "@/lib/db";
import { deleteUserAction, toggleAdminRoleAction } from "../actions";
import { Trash2, Shield, ShieldAlert, User } from "lucide-react";

export default async function AdminUsersPage() {
    const users = getAllUsers();

    return (
        <div className="p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Users Directory</h1>
                    <p className="text-slate-500">Manage all registered users on the platform.</p>
                </div>
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium">
                    Total: {users.length}
                </div>
            </header>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">User</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Role</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Joined</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-4 h-4 text-slate-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${user.role === 'admin'
                                            ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
                                            : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                        }`}>
                                        {user.role === 'admin' ? <ShieldAlert className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                        <span className="capitalize">{user.role || 'user'}</span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <form action={toggleAdminRoleAction.bind(null, user.id, user.role || 'user')}>
                                            <button
                                                title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-purple-600 transition-colors"
                                            >
                                                <Shield className="w-4 h-4" />
                                            </button>
                                        </form>

                                        <form action={deleteUserAction.bind(null, user.id)}>
                                            <button
                                                title="Delete User"
                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                                                onClick={(e) => {
                                                    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
