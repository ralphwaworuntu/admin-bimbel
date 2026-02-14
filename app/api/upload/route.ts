import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const siteId = data.get("siteId") as string;

        if (!file) {
            return NextResponse.json({ success: false, message: "No file found" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads", siteId || "general");
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);

        const publicUrl = `/uploads/${siteId || "general"}/${filename}`;

        return NextResponse.json({ success: true, url: publicUrl });

    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
    }
}
