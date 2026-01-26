"use client";

import React, { createContext, useContext, useEffect } from "react";
import Lenis from "lenis";

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
    children: React.ReactNode;
}

// TUNING CONSTANTS
const LERP = 0.1; // 0.08 - 0.12 (Lower is smoother/slower)
const WHEEL_MULTIPLIER = 1.0;
const TOUCH_MULTIPLIER = 1.2;

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const [lenis, setLenis] = React.useState<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            console.log("Smooth scroll disabled due to user preference (reduced motion)");
            return;
        }

        // Initialize Lenis
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: LERP,
            wheelMultiplier: WHEEL_MULTIPLIER,
            touchMultiplier: TOUCH_MULTIPLIER,
            infinite: false,
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLenis(lenisInstance);

        // RAF Loop
        let rafId: number;
        function raf(time: number) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Synchronize with Framer Motion (it usually works naturally with document scroll)
        // but dispatching scroll event manually helps with some edge cases
        lenisInstance.on('scroll', () => {
            // Option to sync with GSAP ScrollTrigger if it was present
            // ScrollTrigger.update();
        });

        // Handle internal anchor links automatically
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (anchor && anchor.hash && anchor.origin === window.location.origin) {
                const element = document.querySelector(anchor.hash) as HTMLElement;
                if (element) {
                    e.preventDefault();
                    lenisInstance.scrollTo(element, {
                        offset: 0,
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                    // Update URL hash without jumping
                    history.pushState(null, "", anchor.hash);
                }
            }
        };

        window.addEventListener("click", handleAnchorClick);

        return () => {
            lenisInstance.destroy();
            cancelAnimationFrame(rafId);
            window.removeEventListener("click", handleAnchorClick);
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={lenis}>
            {children}
        </SmoothScrollContext.Provider>
    );
}
