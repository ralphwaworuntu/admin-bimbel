import { Template } from "@/types/site";

export const templates: Template[] = [
    {
        id: "nexus-business",
        name: "Nexus Business v2",
        description: "Optimized for lead generation with custom enquiry forms and team modules.",
        category: "business",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiRjhe3L7mGb8rbAmnHbHSeuIsnZOwPop5hYNSRzrWRl_fhzsmTSkJOWLNFe98pyUsWLv5TnWtzExE02P_RU8Um2-oD2lZjKIpln5VP42Se5a4zZzrDl-L_dg0ulNSLSvIQE8lDPHGhyiY7-U9ALC5u2Zuyc2ha-R-7HKXIeSdlVENA-epYCUe3g3gDofT2E9cqPZMKvk7YPD8DioHcKf2QiO-euEerfKyjAwW-AE66nAwyIQfgm_iaAEyVlHvihO9YAXtAP8n5mw",
        rating: 4.9,
        tags: ["Corporate", "Lead Gen"],
        defaultConfig: {
            templateId: "nexus-business",
            identity: {
                brandName: "Nexus Corp",
                colors: {
                    name: "Corporate Blue",
                    radius: 0.5,
                    colors: {
                        background: "0 0% 100%",
                        foreground: "222.2 84% 4.9%",
                        primary: "221.2 83.2% 53.3%",
                        primaryForeground: "210 40% 98%",
                        secondary: "210 40% 96.1%",
                        secondaryForeground: "222.2 47.4% 11.2%",
                        accent: "210 40% 96.1%",
                        accentForeground: "222.2 47.4% 11.2%",
                        muted: "210 40% 96.1%",
                        mutedForeground: "215.4 16.3% 46.9%",
                        card: "0 0% 100%",
                        cardForeground: "222.2 84% 4.9%",
                        border: "214.3 31.8% 91.4%",
                        input: "214.3 31.8% 91.4%",
                        ring: "221.2 83.2% 53.3%",
                    }
                },
            },
            content: {
                hero: {
                    title: "Scale Your Enterprise",
                    subtitle: "Enterprise-grade solutions for the modern web.",
                    ctaText: "Get Started",
                },
                services: ["booking", "catalog"],
            },
            functional: {
                whatsapp: "628123456789",
                email: "contact@nexus.com",
                socials: [],
            },
            seo: {
                title: "Scale Your Enterprise | Nexus Corp",
                description: "Enterprise-grade solutions for the modern web.",
                keywords: "enterprise, SaaS, business scaling",
            },
        },
    },
    {
        id: "artisan-coffee",
        name: "Artisan Coffee Hub",
        description: "Simple inventory management and localized WhatsApp ordering integration.",
        category: "umkm",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJALCvOTBXQtrgDTg1E1LfY7rmOBEZ0ehdQeKIk5GPDLZRCx-tewewm9eBGhrYM9mPD6y9Do-vJys7jYmRlUXcXJSo3BjHpLVtvZDK5ZaRPbdmVz7Tn4r5S6kZHMeBP4P8edq1MXpnedRNe53iALLI93JEiy9r93JPQLFEzYG47ZXH3SyuUBUBNIsFBfcFGSI5wcJIeglDOuxfhVcgdNYtTyPW9tZD9tgeXtVd0N91wx3uHw3baGDzxlrw5-_jJjNXtnElQZ9bHkY",
        rating: 4.8,
        tags: ["UMKM", "F&B"],
        defaultConfig: {
            templateId: "artisan-coffee",
            identity: {
                brandName: "Artisan Brew",
                colors: {
                    name: "Warm Earth",
                    radius: 0.75,
                    colors: {
                        background: "30 20% 98%",
                        foreground: "20 14% 4%",
                        primary: "20 70% 35%", // Brown-ish
                        primaryForeground: "30 20% 98%",
                        secondary: "30 20% 90%",
                        secondaryForeground: "20 14% 4%",
                        accent: "30 20% 90%",
                        accentForeground: "20 14% 4%",
                        muted: "30 10% 90%",
                        mutedForeground: "20 10% 40%",
                        card: "0 0% 100%",
                        cardForeground: "20 14% 4%",
                        border: "30 20% 90%",
                        input: "30 20% 90%",
                        ring: "20 70% 35%",
                    }
                },
            },
            content: {
                hero: {
                    title: "Craft Coffee, Daily",
                    subtitle: "Experience the finest beans roasted to perfection.",
                    ctaText: "Order Now",
                },
                services: ["booking", "shop"],
            },
            functional: {
                whatsapp: "628987654321",
                email: "hello@artisan.coffee",
                socials: [],
            },
            seo: {
                title: "Artisan Coffee Hub | Craft Brews",
                description: "Experience the finest beans roasted to perfection.",
                keywords: "coffee, artisan, brew, cafe",
            },
        },
    },
    {
        id: "minimal-creative",
        name: "Minimalist Creative",
        description: "High-impact visual grid with dynamic project upload forms for creators.",
        category: "creative",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhZm86GgjK9mmCWFzC28zbeJvbYFUKgzMpQ9BtoFMKGuAW2-kuSivRlFnjWy1Z-YllWo08s3fqDL0B1bADhlN7tApmkrRNFEyKo71StXiDyQHexaCzU4omFZJgrM5y2T4f0jQ6bb8rO-5SpiubsoIcX9a4mqQOLvlZND3L-BUWyhDj5n3U26MPDs-HGygUeDrjhKfrQOh7XQK1XWahr7-BpbYhfXi80wKxYfH2PcoX2qBKAQgbtrLIEFX_PZ-liOT6roGlVj55nvo",
        rating: 5.0,
        tags: ["Portfolio", "Agency"],
        defaultConfig: {
            templateId: "minimal-creative",
            identity: {
                brandName: "Lumina Studio",
                colors: {
                    name: "Mono & Purple",
                    radius: 0.0,
                    colors: {
                        background: "0 0% 100%",
                        foreground: "0 0% 0%",
                        primary: "262 80% 50%", // Vibrant Purple
                        primaryForeground: "0 0% 100%",
                        secondary: "0 0% 96%",
                        secondaryForeground: "0 0% 0%",
                        accent: "0 0% 96%",
                        accentForeground: "0 0% 0%",
                        muted: "0 0% 96%",
                        mutedForeground: "0 0% 45%",
                        card: "0 0% 100%",
                        cardForeground: "0 0% 0%",
                        border: "0 0% 90%",
                        input: "0 0% 90%",
                        ring: "262 80% 50%",
                    }
                },
            },
            content: {
                hero: {
                    title: "Visual Storytelling",
                    subtitle: "We create digital experiences that matter.",
                    ctaText: "See Our Work",
                },
                services: ["portfolio", "catalog"],
            },
            functional: {
                whatsapp: "628111222333",
                email: "studio@lumina.com",
                socials: [],
            },
            seo: {
                title: "Minimalist Creative | Lumina Studio",
                description: "We create digital experiences that matter.",
                keywords: "design, minimalist, creative agency",
            },
        },
    },
    {
        id: "industrial-pro",
        name: "Industrial Pro",
        description: "Rugged, clean layout for manufacturing and heavy industry services.",
        category: "business",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf0-EPnEAnQFxMqeZjD3qYBGlOS8yL9pJjmxd4zjhOO7Eyr3kdvsQJflW2ceu2ZmvKy5XyFcyqFq2iBtrVZ3yw8Me6r65fbv2xk4guHlJkin9O4Twtz797mWc70iZa8yMW_wX5vJCNFGqqmnvOJ7DwTaOjMENN78gYiqxP0HP7wG9CNzHYX2y_Q2MxsCexqoanoQG3-t5SIPfBv0BU8P4dCMy49ydxSX2uJRXeZ4MXiUyyQV-5hGomW_c8RK22T8veDoumAlBkGzU",
        rating: 4.7,
        tags: ["Corporate", "Industrial"],
        defaultConfig: {
            templateId: "industrial-pro",
            identity: {
                brandName: "SteelWorks",
                colors: {
                    name: "Industrial Grey",
                    radius: 0.25,
                    colors: {
                        background: "0 0% 98%",
                        foreground: "0 0% 15%",
                        primary: "0 0% 20%",
                        primaryForeground: "0 0% 98%",
                        secondary: "0 0% 90%",
                        secondaryForeground: "0 0% 15%",
                        accent: "45 100% 50%", // Warning Yellow accent
                        accentForeground: "0 0% 0%",
                        muted: "0 0% 90%",
                        mutedForeground: "0 0% 50%",
                        card: "0 0% 100%",
                        cardForeground: "0 0% 15%",
                        border: "0 0% 85%",
                        input: "0 0% 85%",
                        ring: "0 0% 20%",
                    }
                },
            },
            content: {
                hero: {
                    title: "Building the Future",
                    subtitle: "Heavy industry solutions for complex infrastructure.",
                    ctaText: "Request Quote",
                },
                services: ["catalog", "booking"],
            },
            functional: {
                whatsapp: "628555666777",
                email: "sales@steelworks.com",
                socials: [],
            },
            seo: {
                title: "Industrial Pro | SteelWorks Manufacturing",
                description: "Heavy industry solutions for complex infrastructure.",
                keywords: "industrial, manufacturing, steelworks",
            },
        },
    },
    {
        id: "freshmart-engine",
        name: "FreshMart Engine",
        description: "Designed for quick product catalogging via our CSV upload form engine.",
        category: "umkm",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8yBV7O-9JVSe2yZeullC-ZdrguAhsWRA7qQjK2P0WqQW9SgWm3XpCZNAeWE6za-3ELhlN77lGXwQEtTXiLN3CEwMyTSdbcvBU6oXSGDD9eKFDsFYza3-FS4VhAT7lcG8Po2OgwztqtkpkMB6mGgCj0Fc6PrNgMWMX8GLmlgLBOWwi2hTe3ivty3pvu2mH8oP4AZOqCZ3heED0tgqPiAEQFET6JaRcH28No9gWwDtzJ8BwL_8YOus7prf5n6fJYzYNb8Hb3xRpiCE",
        rating: 4.9,
        tags: ["UMKM", "Retail"],
        defaultConfig: {
            templateId: "freshmart-engine",
            identity: {
                brandName: "Daily Fresh",
                colors: {
                    name: "Fresh Green",
                    radius: 0.5,
                    colors: {
                        background: "140 30% 98%",
                        foreground: "140 60% 10%",
                        primary: "142 76% 36%", // Green
                        primaryForeground: "0 0% 100%",
                        secondary: "140 30% 90%",
                        secondaryForeground: "140 60% 10%",
                        accent: "35 90% 60%", // Orange accent
                        accentForeground: "0 0% 0%",
                        muted: "140 20% 95%",
                        mutedForeground: "140 20% 50%",
                        card: "0 0% 100%",
                        cardForeground: "140 60% 10%",
                        border: "140 30% 90%",
                        input: "140 30% 90%",
                        ring: "142 76% 36%",
                    }
                },
            },
            content: {
                hero: {
                    title: "Farm to Table",
                    subtitle: "Fresh groceries delivered to your doorstep.",
                    ctaText: "Shop Now",
                },
                services: ["shop", "catalog"],
            },
            functional: {
                whatsapp: "628777888999",
                email: "fresh@mart.com",
                socials: [],
            },
            seo: {
                title: "FreshMart Engine | Daily Fresh Groceries",
                description: "Fresh groceries delivered to your doorstep.",
                keywords: "grocery, fresh food, delivery",
            },
        },
    },
    {
        id: "architectural-lines",
        name: "Architectural Lines",
        description: "Bold typography and full-width gallery sections for spatial designers.",
        category: "creative",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuD316JDVyg9nCUYAsYKOWZdsvEPg9g6v05js5sOQmPMED1-G-UG2-fqEjQ-bhzduOgi-jqPF3aQuDfYqGyfVo76XUdcWUldLwpWF9-7FC2sjHUsveCVQtJ7ajl3FrHYA4UXunnuVxJ-ml4XFdHhI0R3wYD0Z-zpMrPx1OCWPrtmn9E0M6lVNzeTpXDpJ0LDiJBx-FXf4Vom8QVGTUmAwoVHib2hhx0xj5nkoIufWrgfyLssVOewEy-fIR_oGs8erEFTNFK4-R2XsFw",
        rating: 4.6,
        tags: ["Portfolio", "Architecture"],
        defaultConfig: {
            templateId: "architectural-lines",
            identity: {
                brandName: "Archi Struct",
                colors: {
                    name: "Blueprint",
                    radius: 0.0,
                    colors: {
                        background: "220 10% 10%",
                        foreground: "0 0% 98%",
                        primary: "0 0% 100%",
                        primaryForeground: "0 0% 0%",
                        secondary: "220 10% 20%",
                        secondaryForeground: "0 0% 98%",
                        accent: "0 0% 100%",
                        accentForeground: "0 0% 0%",
                        muted: "220 10% 20%",
                        mutedForeground: "220 10% 60%",
                        card: "220 10% 15%",
                        cardForeground: "0 0% 98%",
                        border: "220 10% 30%",
                        input: "220 10% 30%",
                        ring: "0 0% 100%",
                    }
                },
            },
            content: {
                hero: {
                    title: "Form Follows Function",
                    subtitle: "Modern architecture for a sustainable world.",
                    ctaText: "View Projects",
                },
                services: ["portfolio", "booking"],
            },
            functional: {
                whatsapp: "628222333444",
                email: "info@architect.com",
                socials: [],
            },
            seo: {
                title: "Architectural Lines | Archi Struct",
                description: "Modern architecture for a sustainable world.",
                keywords: "architecture, sustainable design, spatial art",
            },
        },
    },
];
