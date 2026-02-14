"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
    value: string;
    onChange: (newValue: string) => void;
    className?: string;
    placeholder?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
    multiline?: boolean;
}

export function EditableText({
    value,
    onChange,
    className,
    placeholder = "Type here...",
    as: Component = "p",
    multiline = false
}: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) {
            e.preventDefault();
            containerRef.current?.blur();
        }
    };

    return (
        <Component
            ref={containerRef as any}
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onInput={(e: React.FormEvent<HTMLElement>) => setLocalValue(e.currentTarget.innerText)}
            onKeyDown={handleKeyDown}
            className={cn(
                "outline-none transition-all duration-200 border border-transparent rounded-lg px-1 -mx-1",
                "hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-800",
                isEditing && "bg-white dark:bg-slate-900 ring-2 ring-primary-brand border-transparent shadow-lg z-10 relative cursor-text text-slate-900 dark:text-white",
                !localValue && "empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 cursor-text",
                className
            )}
            data-placeholder={placeholder}
        >
            {value}
        </Component>
    );
}
