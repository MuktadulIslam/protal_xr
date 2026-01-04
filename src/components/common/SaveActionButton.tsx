'use client'

import { useEffect, useState } from "react";

interface SaveActionButtonProps {
    iconPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    onSave: () => Promise<void>
}

export default function SaveActionButton({ iconPosition = 'top-right', onSave }: SaveActionButtonProps) {
    const [isSaving, setIsSaving] = useState(false);

    // Handle Ctrl+Shift+S key press
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'S') {
                event.preventDefault();
                callOnSave();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [onSave]);

    const callOnSave = async () => {
        setIsSaving(true);
        await onSave();
        setIsSaving(false);
    };

    let positionClass: string;
    if (iconPosition == 'top-right') positionClass = 'top-3 right-16'
    else if (iconPosition == 'top-left') positionClass = 'top-3 left-16'
    else if (iconPosition == 'bottom-left') positionClass = 'bottom-3 left-16'
    else if (iconPosition == 'bottom-right') positionClass = 'bottom-3 right-16'
    else positionClass = 'top-4 right-4'

    return (
        <div className={`${positionClass} absolute group`}>
            <button
                onClick={callOnSave}
                disabled={isSaving}
                className={`py-2 w-18 text-center text-sm font-medium bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Save (Ctrl+Shift+S)"
            >
                {isSaving ? 'Saving...' : 'Save'}
            </button>
            {/* Tooltip */}
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                    Ctrl + Shift + S
                </div>
            </div>
        </div>
    )
}