'use client'

import React, { useState, useEffect } from 'react';
import { CgMaximizeAlt, CgMinimize } from "react-icons/cg";

interface FullscreenWrapperProps {
    children: React.ReactNode;
    iconPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    showIcon?: boolean
    iconClasses?: string
    fullScreenByKey?: boolean
}


export default function FullscreenWrapper({ children, iconPosition = 'top-right', showIcon = true, iconClasses, fullScreenByKey = false }: FullscreenWrapperProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Handle escape key press
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
            else if ((event.key === 'F' || event.key === 'f') && fullScreenByKey) {
                setIsFullscreen((pre) => !pre);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isFullscreen, fullScreenByKey]);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const wrapperClasses = isFullscreen
        ? 'fixed w-screen h-screen top-0 left-0 z-50 bg-white'
        : 'relative w-full h-full';

    let positionClass: string;
    if (iconPosition == 'top-right') positionClass = 'top-3 right-3'
    else if (iconPosition == 'top-left') positionClass = 'top-3 left-3'
    else if (iconPosition == 'bottom-left') positionClass = 'bottom-3 left-3'
    else if (iconPosition == 'bottom-right') positionClass = 'bottom-3 right-3'
    else positionClass = 'top-4 right-4'

    return (
        <div className={wrapperClasses}>
            {children}

            {/* Toggle button */}
            {showIcon &&
                <button
                    onClick={toggleFullscreen}
                    className={iconClasses ? iconClasses : `absolute ${positionClass} p-2 bg-white hover:bg-linear-to-r hover:from-cyan-50 hover:to-blue-50 text-gray-600 hover:text-cyan-600 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 z-10`}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                    {isFullscreen ? (
                        <CgMinimize className="w-5 h-5" />
                    ) : (
                        <CgMaximizeAlt className="w-5 h-5" />
                    )}
                </button>
            }
        </div >
    );
};