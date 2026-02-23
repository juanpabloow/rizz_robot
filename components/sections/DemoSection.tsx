"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ChatDemo } from "./ServiceDemos";

export const DemoSection = () => {
    return (
        <SectionWrapper id="demo" className="relative overflow-hidden">
            {/* Background elements for visual separation/elegance */}


            <div className="max-w-5xl mx-auto px-4">
                {/* Title Section */}
                <div className="mb-12 text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                        Implementa agentes que actúan y toman decisiones.
                    </h2>
                    <p className="text-brand-gray-400 text-lg">
                        Nuestros agentes no solo responden consultas, ejecutan procesos complejos y se integran con tu ecosistema.
                    </p>
                </div>

                {/* Demo Container */}
                <div className="relative mx-auto w-full max-w-4xl">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-linear-to-r from-brand-blue-primary via-purple-500 to-brand-blue-accent opacity-20 blur-2xl rounded-[32px] -z-10" />

                    <div className="relative h-[550px] md:h-auto md:aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B0D12]">
                        <ChatDemo />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
