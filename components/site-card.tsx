import Link from "next/link";
import Image from "next/image";
import { Template } from "@/types/site";

interface SiteCardProps {
    template: Template;
}

export function SiteCard({ template }: SiteCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video w-full overflow-hidden bg-muted">
                {/* Placeholder for thumbnail if image load fails or is missing */}
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <span className="text-sm">Thumbnail</span>
                </div>
                {/* 
        <Image
          src={template.thumbnail}
          alt={template.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        */}
            </div>
            <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 capitalize">
                        {template.category}
                    </span>
                </div>
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                    {template.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                </p>
                <div className="mt-4">
                    <Link
                        href={`/wizard?template=${template.id}`}
                        className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        Use Template
                    </Link>
                </div>
            </div>
        </div>
    );
}
