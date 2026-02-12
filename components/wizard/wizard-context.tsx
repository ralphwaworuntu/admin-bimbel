"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteConfig, Template } from "@/types/site";
import { templates } from "@/lib/mock-data";
import { useSearchParams } from "next/navigation";

interface WizardContextType {
    currentStep: number;
    totalSteps: number;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    config: SiteConfig;
    updateConfig: (updates: DeepPartial<SiteConfig>) => void;
    toggleService: (serviceId: string) => void;
    toggleSection: (sectionId: string) => void;
    selectedTemplate: Template | null;
    isGenerated: boolean;
    setIsGenerated: (generated: boolean) => void;
    isFocusMode: boolean;
    setIsFocusMode: (mode: boolean) => void;
    isHeatmapActive: boolean;
    setIsHeatmapActive: (active: boolean) => void;
    smartSuggest: (audience: string, intent: string) => void;
    getContrastScore: () => 'low' | 'high';
}

// Helper type for deep partial updates
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const STEPS = 6;

const defaultConfig: SiteConfig = {
    id: "",
    subdomain: "",
    templateId: "",
    identity: {
        brandName: "",
        colors: {
            name: "default",
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
        }
    },
    content: {
        hero: {
            title: "",
            subtitle: "",
            ctaText: "Get Started",
        },
        services: [],
    },
    functional: {
        whatsapp: "",
        email: "",
        socials: [],
        address: "",
        businessHours: {
            open: "09:00",
            close: "17:00"
        }
    },
    seo: {
        title: "",
        description: "",
        keywords: "",
    }
};

export function WizardProvider({ children }: { children: React.ReactNode }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultConfig);
    const [isGenerated, setIsGenerated] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [isHeatmapActive, setIsHeatmapActive] = useState(false);
    const searchParams = useSearchParams();

    // Load state from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('waas_wizard_config');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Ensure we merge with defaults for safety
                setSiteConfig(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to load config", e);
            }
        }
    }, []);

    // Persist state to localStorage on changes
    useEffect(() => {
        localStorage.setItem('waas_wizard_config', JSON.stringify(siteConfig));
    }, [siteConfig]);

    // Load template from URL
    useEffect(() => {
        const templateId = searchParams.get("template");
        if (templateId) {
            const template = templates.find((t) => t.id === templateId);
            if (template) {
                setSiteConfig((prev) => ({
                    ...prev,
                    ...template.defaultConfig,
                    identity: {
                        ...prev.identity,
                        ...template.defaultConfig.identity
                    },
                    content: {
                        ...prev.content,
                        ...template.defaultConfig.content
                    }
                }));
            }
        }
    }, [searchParams]);

    const updateConfig = (updates: DeepPartial<SiteConfig>) => {
        setSiteConfig((prev) => {
            const newConfig = { ...prev };

            if (updates.identity) {
                newConfig.identity = {
                    ...prev.identity,
                    ...updates.identity,
                    colors: {
                        ...prev.identity.colors,
                        ...(updates.identity.colors || {}),
                        colors: {
                            ...prev.identity.colors.colors,
                            ...(updates.identity.colors?.colors || {})
                        }
                    }
                } as any;
            }

            if (updates.content) {
                newConfig.content = {
                    ...prev.content,
                    ...updates.content,
                    hero: {
                        ...prev.content.hero,
                        ...(updates.content.hero || {})
                    },
                    services: (updates.content.services as string[]) || prev.content.services,
                    sections: (updates.content.sections as string[]) || prev.content.sections
                } as any;
            }

            if (updates.functional) {
                newConfig.functional = {
                    ...prev.functional,
                    ...updates.functional,
                    businessHours: {
                        ...prev.functional.businessHours,
                        ...(updates.functional.businessHours || {})
                    },
                    socials: updates.functional.socials
                        ? (updates.functional.socials as any[]).filter(s => s.url && s.url.trim() !== "")
                        : prev.functional.socials
                } as any;
            }

            if (updates.growth) {
                newConfig.growth = {
                    ...prev.growth,
                    ...updates.growth
                } as any;
            }

            if (updates.seo) {
                newConfig.seo = {
                    ...prev.seo,
                    ...updates.seo
                } as any;
            }

            return newConfig;
        });
    };

    const getContrastScore = () => {
        const primary = siteConfig.identity.colors.colors.primary;
        // Simple luminance check for accessibility
        // If it starts with #, parse hex. If HSL, return dummy for now.
        if (primary.startsWith('#')) {
            const hex = primary.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance > 0.5 ? 'low' : 'high'; // Dark primary on light bg = high contrast
        }
        return 'high';
    };

    const getRegionDefaults = (region: string) => {
        const regions: Record<string, any> = {
            id: { currency: "Rp", phonePrefix: "+62", address: "Jakarta, Indonesia" },
            global: { currency: "$", phonePrefix: "+1", address: "London, UK" },
            jp: { currency: "¥", phonePrefix: "+81", address: "Tokyo, Japan" },
            us: { currency: "$", phonePrefix: "+1", address: "New York, USA" },
        };
        return regions[region] || regions.global;
    };

    const smartSuggest = (audience: string, intent: string) => {
        const brands = siteConfig.identity.brandName || "Your Enterprise";
        const region = siteConfig.identity.region || 'global';
        const regDefaults = getRegionDefaults(region);

        const suggestions: Record<string, any> = {
            luxury: {
                typography: 'classic',
                color: '220 10% 10%',
                voice: 'professional',
                hero: {
                    title: `The Sovereign Standard of ${brands}`,
                    subtitle: `Exclusivity redefined. ${brands} provides elite digital environments for the world's most discerning brands in ${regDefaults.address.split(',')[0]}.`,
                    ctaText: "Request Private Access"
                }
            },
            tech: {
                typography: 'tech',
                color: '221.2 83.2% 53.3%',
                voice: 'scientific',
                hero: {
                    title: `${brands}: Neural Layer 01`,
                    subtitle: `Highly scalable infrastructure engineered for the next generation of logical systems. Deploy in sub-30ms from our ${regDefaults.address.split(',')[0]} node.`,
                    ctaText: "Initialize Node"
                }
            },
            corporate: {
                typography: 'modern',
                color: '222.2 47.4% 11.2%',
                voice: 'professional',
                hero: {
                    title: `${brands}: Strategic Industry Leadership`,
                    subtitle: `Optimizing enterprise efficiency in ${regDefaults.address} through rigorous data analysis and expert-led digital transformation.`,
                    ctaText: "Book Strategy Session"
                }
            },
            umkm: {
                typography: 'playful',
                color: '142 76% 36%',
                voice: 'friendly',
                hero: {
                    title: `Tumbuh Bersama ${brands}`,
                    subtitle: `Solusi digital terpercaya di ${regDefaults.address.split(',')[0]} untuk memajukan bisnis Anda. Mudah, cepat, dan profesional.`,
                    ctaText: "Konsultasi Gratis"
                }
            },
            youth: {
                typography: 'playful',
                color: '262 80% 50%',
                voice: 'bold',
                hero: {
                    title: `Level Up with ${brands}`,
                    subtitle: `No cap, we're building the future of digital hype in ${regDefaults.address.split(',')[0]}. Join the movement and dominate the feed.`,
                    ctaText: "Get Hyped"
                }
            },
        };

        const suggestion = suggestions[audience] || suggestions.corporate;

        updateConfig({
            identity: {
                typography: suggestion.typography,
                voice: suggestion.voice,
                audience: audience as any,
                intent: intent as any,
                colors: {
                    ...siteConfig.identity.colors,
                    colors: {
                        ...siteConfig.identity.colors.colors,
                        primary: suggestion.color
                    }
                }
            },
            content: {
                hero: {
                    ...siteConfig.content.hero,
                    ...suggestion.hero
                }
            },
            functional: {
                whatsapp: siteConfig.functional.whatsapp || regDefaults.phonePrefix,
                address: siteConfig.functional.address || regDefaults.address
            }
        });
    };

    const toggleService = (serviceId: string) => {
        setSiteConfig((prev) => {
            const currentServices = prev.content.services || [];
            const isSelected = currentServices.includes(serviceId);
            const newServices = isSelected
                ? currentServices.filter(id => id !== serviceId)
                : [...currentServices, serviceId];

            return {
                ...prev,
                content: {
                    ...prev.content,
                    services: newServices
                }
            };
        });
    };

    const toggleSection = (sectionId: string) => {
        setSiteConfig((prev) => {
            const currentSections = prev.content.sections || [];
            const isSelected = currentSections.includes(sectionId);
            const newSections = isSelected
                ? currentSections.filter(id => id !== sectionId)
                : [...currentSections, sectionId];

            return {
                ...prev,
                content: {
                    ...prev.content,
                    sections: newSections
                }
            };
        });
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const selectedTemplate = templates.find(t => t.id === siteConfig.templateId) || null;

    return (
        <WizardContext.Provider
            value={{
                currentStep,
                totalSteps: STEPS,
                nextStep,
                prevStep,
                setStep: setCurrentStep,
                config: siteConfig,
                updateConfig,
                toggleService,
                toggleSection,
                selectedTemplate,
                isGenerated,
                setIsGenerated,
                isFocusMode,
                setIsFocusMode,
                isHeatmapActive,
                setIsHeatmapActive,
                smartSuggest,
                getContrastScore
            }}
        >
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const context = useContext(WizardContext);
    if (context === undefined) {
        throw new Error("useWizard must be used within a WizardProvider");
    }
    return context;
}
