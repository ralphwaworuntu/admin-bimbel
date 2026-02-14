"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Upload, Check, Loader2, Image as ImageIcon } from "lucide-react";

interface MediaPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    currentImage?: string;
    siteId: string;
}

const STOCK_IMAGES = [
    '/placeholder-hero.jpg',
    '/placeholder-feature.jpg',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', // Modern architecture
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop', // Meeting
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', // Teamwork
];

export function MediaPicker({ isOpen, onClose, onSelect, currentImage, siteId }: MediaPickerProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("siteId", siteId);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                onSelect(data.url);
                onClose();
            } else {
                setUploadError(data.message || "Upload failed");
            }
        } catch (err) {
            setUploadError("An error occurred during upload");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md md:max-w-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-primary-brand" /> Media Library
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                        <TabsTrigger value="stock">Stock Library</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="mt-4 space-y-4">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={isUploading}
                            />
                            {isUploading ? (
                                <Loader2 className="w-10 h-10 text-primary-brand animate-spin mb-4" />
                            ) : (
                                <Upload className="w-10 h-10 text-slate-400 mb-4" />
                            )}
                            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                {isUploading ? "Uploading..." : "Click or drag to upload"}
                            </p>
                            <p className="text-xs text-slate-400 mt-2">Supports JPG, PNG, WEBP</p>
                            {uploadError && <p className="text-xs text-rose-500 mt-4 font-bold">{uploadError}</p>}
                        </div>
                    </TabsContent>

                    <TabsContent value="stock" className="mt-4">
                        <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {STOCK_IMAGES.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => { onSelect(src); onClose(); }}
                                    className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative group hover:ring-2 hover:ring-primary-brand transition-all"
                                >
                                    <img src={src} alt="Stock" className="w-full h-full object-cover" />
                                    {currentImage === src && (
                                        <div className="absolute inset-0 bg-primary-brand/20 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full bg-primary-brand text-white flex items-center justify-center">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
