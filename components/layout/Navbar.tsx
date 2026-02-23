"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

const navLinks = [
    { name: "Servicios", href: "#services" },
    { name: "Beneficios", href: "#benefits" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const { scrollY } = useScroll();
    const lenis = useSmoothScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const handleScrollToCTA = () => {
        if (lenis) {
            lenis.scrollTo("#cta", { duration: 1.2 });
        } else {
            document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
                    isScrolled &&
                    "bg-brand-black/50 backdrop-blur-xl border-white/5 shadow-lg shadow-brand-blue-primary/5"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20 relative">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue-primary to-brand-blue-accent flex items-center justify-center text-white font-bold text-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow">
                                M
                            </div>
                            <span className="font-bold text-lg tracking-tight text-white">
                                Montserrat<span className="text-brand-blue-primary">AI</span>
                            </span>
                        </Link>

                        {/* Desktop Nav - Center Links */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-brand-gray-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Nav - Right CTA */}
                        <div className="hidden md:flex items-center">
                            <Button size="sm" onClick={handleScrollToCTA}>
                                Agendar Demo
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-brand-gray-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/5 bg-brand-black/95 backdrop-blur-xl"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block text-base font-medium text-brand-gray-400 hover:text-white py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4">
                                <Button className="w-full" onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handleScrollToCTA();
                                }}>
                                    Agendar Demo
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.nav>
        </>
    );
};
