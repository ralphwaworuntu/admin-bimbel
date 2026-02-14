import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    const userRole = (session.user as any).role;
    if (userRole !== "admin") {
        redirect("/dashboard");
    }

    return (
        <AdminShell session={session}>
            {children}
        </AdminShell>
    );
}
