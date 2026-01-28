"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScaleWrapperProps {
    children: React.ReactNode;
    targetWidth: number; // The width of the content to be scaled (e.g., 794 for A4)
    className?: string; // Optional wrapper class
}

export const ScaleWrapper: React.FC<ScaleWrapperProps> = ({
    children,
    targetWidth,
    className = ""
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [scaledHeight, setScaledHeight] = useState<number | "auto">("auto");

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        const calculateScale = () => {
            if (!containerRef.current || !contentRef.current) return;

            const containerWidth = containerRef.current.getBoundingClientRect().width;
            const contentWidth = Math.max(targetWidth, contentRef.current.scrollWidth);
            const contentHeight = contentRef.current.scrollHeight;

            // Calculate scale: container width / content width (with 5% buffer)
            const newScale = (containerWidth / contentWidth) * 0.95;
            setScale(newScale);

            // Set the container height to the scaled height of the content
            setScaledHeight(contentHeight * newScale);
        };

        const observer = new ResizeObserver(calculateScale);
        observer.observe(containerRef.current);
        observer.observe(contentRef.current);

        calculateScale();

        return () => observer.disconnect();
    }, [targetWidth]);

    return (
        <div
            ref={containerRef}
            className={`w-full relative overflow-hidden ${className}`}
            style={{ height: scaledHeight }}
        >
            <div
                ref={contentRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    minWidth: targetWidth,
                    width: "max-content",
                    transform: `translateX(-50%) scale(${scale})`,
                    transformOrigin: "top center"
                }}
            >
                {children}
            </div>
        </div>
    );
};
