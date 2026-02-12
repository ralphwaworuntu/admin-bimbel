"use client";

/**
 * Site Export Utility
 * Exports the full site configuration as a downloadable JSON file.
 * In a production environment, this could generate a full static site bundle.
 */

export interface ExportOptions {
    format: "json" | "html";
    includeAssets?: boolean;
}

export function exportSiteConfig(config: any, options: ExportOptions = { format: "json" }) {
    const brandSlug = (config.identity?.brandName || "site").toLowerCase().replace(/\s+/g, "-");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    if (options.format === "json") {
        const exportData = {
            _meta: {
                exportedAt: new Date().toISOString(),
                version: "1.0.0",
                generator: "WaaS Builder - InstantEngine",
            },
            config,
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${brandSlug}-config-${timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    if (options.format === "html") {
        const primaryColor = config.identity?.colors?.colors?.primary || "#8106D1";
        const brandName = config.identity?.brandName || "My Site";
        const heroTitle = config.content?.hero?.title || "Welcome";
        const heroSubtitle = config.content?.hero?.subtitle || "";
        const ctaText = config.content?.hero?.ctaText || "Get Started";
        const email = config.functional?.email || "";
        const whatsapp = config.functional?.whatsapp || "";

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.seo?.title || brandName}</title>
    <meta name="description" content="${config.seo?.description || heroSubtitle}">
    <meta name="keywords" content="${config.seo?.keywords || ""}">
    <meta property="og:title" content="${config.seo?.title || brandName}">
    <meta property="og:description" content="${config.seo?.description || heroSubtitle}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; color: #1a1a2e; background: #fff; }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; }
        .hero h1 { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 1.5rem; line-height: 1.1; }
        .hero p { font-size: 1.25rem; color: #64748b; max-width: 600px; margin: 0 auto 2rem; }
        .btn { display: inline-block; padding: 1rem 2.5rem; background: ${primaryColor}; color: #fff; border-radius: 1rem; font-weight: 900; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; transition: transform 0.2s; }
        .btn:hover { transform: scale(1.05); }
        .footer { padding: 4rem 2rem; text-align: center; background: #0f172a; color: #94a3b8; }
        .footer a { color: #fff; text-decoration: none; }
    </style>
</head>
<body>
    <nav style="padding: 1.5rem 3rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9;">
        <strong style="font-size: 1.25rem; font-weight: 900;">${brandName}</strong>
        <a href="#contact" class="btn" style="padding: 0.75rem 1.5rem; font-size: 0.7rem;">${ctaText}</a>
    </nav>
    <section class="hero">
        <div>
            <h1>${heroTitle}</h1>
            <p>${heroSubtitle}</p>
            <a href="#contact" class="btn">${ctaText}</a>
        </div>
    </section>
    <footer class="footer" id="contact">
        <p style="margin-bottom: 1rem; font-weight: 900; color: #fff; font-size: 1.5rem;">Get in Touch</p>
        ${email ? `<p style="margin-bottom: 0.5rem;">Email: <a href="mailto:${email}">${email}</a></p>` : ""}
        ${whatsapp ? `<p>WhatsApp: <a href="https://wa.me/${whatsapp}">${whatsapp}</a></p>` : ""}
        <p style="margin-top: 2rem; font-size: 0.75rem;">Built with InstantEngine WaaS Builder</p>
    </footer>
</body>
</html>`;

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${brandSlug}-site-${timestamp}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
