"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

const FRAME_COUNT = 40;
const DESKTOP_IMAGES_DIR = "/hero-sequence";
const DESKTOP_IMAGE_PREFIX = "frame_";
const MOBILE_IMAGES_DIR = "/hero-mobile";
const MOBILE_IMAGE_PREFIX = "mobile_frame_";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const lenis = useSmoothScroll();

    // Scroll progress 0 -> 1 within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map 0-1 to 0-(FRAME_COUNT-1)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Detect Mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        // Initial check
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Preload images based on device
    useEffect(() => {
        setIsLoaded(false); // Reset loaded state when switching source

        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            const dir = isMobile ? MOBILE_IMAGES_DIR : DESKTOP_IMAGES_DIR;
            const prefix = isMobile ? MOBILE_IMAGE_PREFIX : DESKTOP_IMAGE_PREFIX;

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise((resolve) => {
                    const img = new Image();
                    img.src = `${dir}/${prefix}${i.toString().padStart(3, "0")}.jpg`;
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null); // Resolve to avoid breaking Promise.all
                    loadedImages[i] = img; // maintain order
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            // Filter out any failed images if necessary, or just keep them
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [isMobile]);

    // Draw to canvas
    useEffect(() => {
        const render = (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx || images.length === 0) return;

            const imgIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)));
            const img = images[imgIndex];
            if (!img) return;

            // Aspect ratio 'cover' logic
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            // Prevent division by zero
            if (img.height === 0 || canvasHeight === 0) return;

            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvasHeight;
                drawWidth = canvasHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Initial render
        if (isLoaded) {
            render(currentIndex.get());
        }

        const unsubscribe = currentIndex.on("change", (latest) => {
            if (isLoaded) render(latest);
        });

        return () => unsubscribe();
    }, [currentIndex, isLoaded, images]);

    // Handle Resize (Canvas Size)
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;

                // Force re-render on resize if loaded
                if (isLoaded && images.length > 0) {
                    const idx = currentIndex.get();
                    const imgIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(idx)));
                    const img = images[imgIndex];
                    const ctx = canvasRef.current.getContext("2d");

                    if (ctx && img && img.complete && img.naturalHeight !== 0) {
                        const canvasWidth = canvasRef.current.width;
                        const canvasHeight = canvasRef.current.height;
                        const imgRatio = img.width / img.height;
                        const canvasRatio = canvasWidth / canvasHeight;

                        let drawWidth, drawHeight, offsetX, offsetY;
                        if (imgRatio > canvasRatio) {
                            drawHeight = canvasHeight;
                            drawWidth = canvasHeight * imgRatio;
                            offsetX = (canvasWidth - drawWidth) / 2;
                            offsetY = 0;
                        } else {
                            drawWidth = canvasWidth;
                            drawHeight = canvasWidth / imgRatio;
                            offsetX = 0;
                            offsetY = (canvasHeight - drawHeight) / 2;
                        }
                        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                    }
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size set
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images, currentIndex]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-brand-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-black z-50">
                        <div className="animate-spin h-8 w-8 border-t-2 border-brand-blue-primary rounded-full"></div>
                    </div>
                )}

                {/* Canvas Background */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

                {/* --- PREMIUM CONTRAST SYSTEM --- */}

                {/* 1. Global Gradient Overlay */}
                {/* Mobile: Darker overall for text readability. Desktop: Left-to-Right Fade */}
                <div className="absolute inset-0 bg-brand-black/40 lg:bg-transparent lg:bg-linear-to-r lg:from-brand-black lg:via-brand-black/40 lg:to-transparent z-10" />

                {/* 2. Local Scrim for Text Area (Enhances contrast behind copy) */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black/90 lg:bg-[radial-gradient(circle_at_15%_50%,rgba(7,8,11,0.9)_0%,rgba(7,8,11,0.4)_50%,transparent_100%)] z-10" />

                {/* 3. Scanline/Grid Effect (Subtle Texture) */}
                <div className="absolute inset-0 bg-tech-grid opacity-20 z-10 pointer-events-none mix-blend-overlay" />

                {/* Content Container - Platform Layout */}
                <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center lg:justify-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-xl w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-10"
                    >
                        <div className="space-y-6">
                            {/* Headline with Premium Glow Trail */}
                            <div className="relative inline-block">
                                <div className="absolute -inset-8 bg-linear-to-r from-brand-blue-primary/40 via-purple-500/40 to-brand-blue-accent/40 opacity-40 blur-3xl rounded-full -z-10" />
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium lg:font-semibold tracking-tight text-white leading-[1.15] lg:leading-[1.1] relative z-20">
                                    Lleva tus operaciones al <br className="hidden lg:block" /> siguiente estándar
                                </h1>
                            </div>

                            {/* Subheadline */}
                            <p className="text-lg sm:text-lg lg:text-xl text-brand-gray-400 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Automatizaciones con IA que impulsan a empresas modernas a operar con mayor velocidad, precisión y escala, desde atención al cliente hasta ejecución operativa avanzada.
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto min-w-[160px] shadow-lg shadow-brand-blue-primary/20">
                                Agendar Demo
                            </Button>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[160px] border-brand-gray-700/50 hover:bg-brand-gray-800/30">
                                Ver Servicios
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator - Minimal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-gray-400 flex flex-col items-center gap-3 z-30 pointer-events-none"
                >
                    <span className="text-[10px] uppercase tracking-[0.25em] opacity-40 font-medium">Explorar</span>
                    <ChevronDown className="w-4 h-4 opacity-40 animate-bounce" />
                </motion.div>
            </div>
        </div>
    );
};
