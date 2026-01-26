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
            "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary:
                "bg-brand-blue-primary text-white hover:bg-brand-blue-accent shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-transparent",
            secondary:
                "bg-white text-brand-black hover:bg-gray-100 border border-transparent",
            outline:
                "bg-transparent border border-brand-gray-700 text-brand-gray-400 hover:text-white hover:border-brand-gray-400 hover:bg-brand-gray-800/50",
            ghost: "text-brand-gray-400 hover:text-white hover:bg-brand-gray-800/50",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs",
            md: "h-11 px-6 text-sm",
            lg: "h-14 px-8 text-base",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
