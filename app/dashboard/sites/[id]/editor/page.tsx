import { VisualBuilder } from "@/components/editor/visual-builder";
import { getSiteById } from "@/lib/db";
import { notFound } from "next/navigation";
import { SiteConfig } from "@/types/site";

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const site = await getSiteById(id);

    if (!site) {
        notFound();
    }

    return <VisualBuilder siteId={id} initialConfig={site.config as unknown as SiteConfig} />;
}
