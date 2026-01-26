"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

const FRAME_COUNT = 40;
const IMAGES_DIR = "/hero-sequence";
const IMAGE_NAME_PREFIX = "Adobe Express - vidrizz_";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const lenis = useSmoothScroll();

    // Scroll progress 0 -> 1 within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map 0-1 to 0-(FRAME_COUNT-1)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise((resolve) => {
                    const img = new Image();
                    img.src = `${IMAGES_DIR}/${IMAGE_NAME_PREFIX}${i.toString().padStart(3, "0")}.jpg`;
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
    }, []);

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

    // Handle Resize
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
        <div ref={containerRef} className="relative h-[300vh] bg-brand-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-black z-20">
                        <div className="animate-spin h-8 w-8 border-t-2 border-brand-blue-primary rounded-full"></div>
                    </div>
                )}

                {/* Canvas Background */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/20 to-brand-black z-10" />
                {/* Scanline/Grid Effect Overlay */}
                <div className="absolute inset-0 bg-tech-grid opacity-30 z-10 pointer-events-none" />

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 max-w-4xl mx-auto"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-blue-primary/30 bg-brand-blue-primary/10 backdrop-blur-sm mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue-primary"></span>
                            </span>
                            <span className="text-xs font-medium text-brand-blue-primary tracking-wide uppercase">
                                Disponible ahora v2.0
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
                            Respond<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-primary to-brand-blue-accent">Ai</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-xl text-brand-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            Elimina tareas repetitivas y escala tu atención al cliente con Inteligencia Artificial. <br className="hidden md:block" />
                            Sin errores. Sin pausas. Totalmente humano.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button size="lg" onClick={() => (lenis ? lenis.scrollTo('#cta') : document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }))} rightIcon={<ArrowRight size={18} />}>
                                Agendar Demo
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => (lenis ? lenis.scrollTo('#services') : document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }))}>
                                Ver Servicios
                            </Button>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-gray-400 flex flex-col items-center gap-2"
                    >
                        <span className="text-xs uppercase tracking-widest opacity-50">Desliza para explorar</span>
                        <ChevronDown className="animate-bounce" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
