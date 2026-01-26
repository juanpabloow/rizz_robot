"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    gradient?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, gradient = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-brand-gray-400/30 transition-colors",
                    gradient &&
                    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-brand-blue-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";
