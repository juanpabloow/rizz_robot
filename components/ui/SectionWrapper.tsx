import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    fullWidth?: boolean;
}

export const SectionWrapper = ({
    className,
    children,
    fullWidth = false,
    id,
    ...props
}: SectionWrapperProps) => {
    return (
        <section
            id={id}
            className={cn("relative py-20 md:py-32 overflow-hidden", className)}
            {...props}
        >
            <div
                className={cn(
                    "mx-auto px-4 md:px-6",
                    !fullWidth && "max-w-7xl"
                )}
            >
                {children}
            </div>
        </section>
    );
};
