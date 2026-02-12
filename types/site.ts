import { ThemeConfig } from "./theme";

export interface SiteConfig {
    id: string;
    subdomain: string;
    templateId: string;
    identity: {
        brandName: string;
        logoUrl?: string;
        audience?: 'luxury' | 'youth' | 'corporate' | 'umkm' | 'tech';
        typography?: 'classic' | 'modern' | 'tech' | 'playful';
        voice?: 'bold' | 'friendly' | 'professional' | 'scientific';
        region?: 'id' | 'global' | 'jp' | 'us';
        intent?: 'conversion' | 'content' | 'service';
        colors: ThemeConfig;
    };
    content: {
        hero: {
            title: string;
            subtitle: string;
            ctaText: string;
            ctaType?: 'started' | 'booking' | 'waitlist' | 'shop' | 'consultation';
            image?: string;
        };
        services: string[];
        sections?: string[];
        testimonials?: TestimonialItem[];
        about?: {
            title: string;
            description: string;
            image?: string;
        };
    };
    functional: {
        whatsapp?: string;
        email?: string;
        address?: string;
        businessHours?: {
            open: string;
            close: string;
        };
        socials: {
            platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok';
            url: string;
        }[];
        mapsUrl?: string; // Used for Google Maps embed
        calendlyUrl?: string; // New field for direct booking
    };
    seo: {
        title: string;
        description: string;
        keywords: string;
        ogImage?: string;
    };
    growth?: {
        magnetHeadline?: string;
        magnetDescription?: string;
        magnetCta?: string;
    };
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon?: string;
}

export interface TestimonialItem {
    id: string;
    name: string;
    role?: string;
    content: string;
    avatar?: string;
}

export interface SocialLink {
    platform: "instagram" | "facebook" | "twitter" | "linkedin" | "tiktok";
    url: string;
}

export interface Template {
    id: string;
    name: string;
    description: string;
    category: 'business' | 'creative' | 'umkm' | 'retail' | 'other';
    thumbnail: string;
    defaultConfig: Omit<SiteConfig, 'id' | 'subdomain'>;
    rating?: number;
    tags?: string[];
}
