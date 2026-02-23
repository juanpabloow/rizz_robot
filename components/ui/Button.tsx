"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    asChild?: boolean;
}

// Combine Framer Motion props with our custom props
type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading,
            leftIcon,
            rightIcon,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-[var(--radius-button)] font-mono font-medium tracking-wide transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary:
                "bg-brand-primary text-white shadow-lg shadow-brand-primary/25 border border-transparent hover:brightness-110 active:translate-y-0",
            secondary:
                "bg-transparent border border-white/20 text-white hover:bg-white/5 active:bg-white/10",
            outline: // Keeping outline as fallback, styling similar to secondary
                "bg-transparent border border-brand-gray-700 text-brand-gray-400 hover:text-white hover:border-brand-gray-400 hover:bg-brand-gray-800/50",
            ghost:
                "bg-[#0F172A] border border-white/10 text-white hover:bg-[#1E293B] hover:border-white/20",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-5 text-sm",
            lg: "h-12 px-7 text-base",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </motion.button>
        );
    }
);
Button.displayName = "Button";
