"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MessageSquare, Phone, UserCog, ChevronDown } from "lucide-react";
import { WorkflowPreview } from "./WorkflowPreview";
import { IntegrationsPreview } from "./IntegrationsPreview";
import { KPIDashboard } from "./KPIDashboard";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
const services = [
    {
        id: "workflows",
        number: "01",
        title: "Workflows totalmente personalizados",
        description: "Diseña agentes de IA con instrucciones claras y acceso a las herramientas y sistemas necesarios para ejecutar tareas específicas con precisión y autonomía.",
    },
    {
        id: "integracion",
        number: "02",
        title: "Integración con cualquier sistema",
        description: "Conecta los agentes de IA a cualquier herramienta mediante APIs, webhooks o automatizaciones avanzadas, asegurando interoperabilidad total con tu ecosistema tecnológico.",
    },
    {
        id: "data",
        number: "03",
        title: "Extracción y análisis de datos",
        description: "Cada interacción genera datos accionables. Extrae, procesa y analiza información en tiempo real para optimizar decisiones y mejorar la eficiencia operativa.",
    },
];

export const Services = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <SectionWrapper id="services">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                    Nuestros Servicios
                </h2>
                <p className="text-brand-gray-400 max-w-2xl mx-auto">
                    Soluciones modulares de IA diseñadas para integrarse perfectamente en tu flujo de trabajo existente.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* Columna Izquierda: Accordion (38-42%) */}
                <div className="w-full lg:w-[40%] space-y-4">
                    {services.map((service, idx) => (
                        <div
                            key={service.id}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                                "group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden",
                                activeIndex === idx
                                    ? "bg-brand-gray-800/50 border-brand-blue-primary/40 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
                                    : "bg-transparent border-white/5 hover:border-white/10"
                            )}
                        >
                            <div className="p-6 flex items-start gap-5">
                                <div className={cn(
                                    "text-lg font-mono font-bold tracking-tighter transition-colors duration-300",
                                    activeIndex === idx
                                        ? "text-brand-blue-primary"
                                        : "text-brand-gray-600 group-hover:text-brand-gray-400"
                                )}>
                                    {service.number}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={cn(
                                            "text-lg font-bold transition-colors duration-300",
                                            activeIndex === idx ? "text-white" : "text-brand-gray-400 group-hover:text-brand-gray-300"
                                        )}>
                                            {service.title}
                                        </h3>
                                        <ChevronDown className={cn(
                                            "w-5 h-5 transition-transform duration-300",
                                            activeIndex === idx ? "rotate-180 text-brand-blue-primary" : "text-brand-gray-700"
                                        )} />
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {activeIndex === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, y: 6 }}
                                                animate={{ height: "auto", opacity: 1, y: 0 }}
                                                exit={{ height: 0, opacity: 0, y: 6 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                            >
                                                <p className="text-brand-gray-400 text-sm mt-3 leading-relaxed">
                                                    {service.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Columna Derecha: Placeholder Estático */}
                <div className="w-full lg:w-[60%] sticky top-24">
                    <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden glass-card border border-white/5 shadow-2xl bg-[#0B0D12]">
                        {services[activeIndex].id === "workflows" ? (
                            <WorkflowPreview />
                        ) : services[activeIndex].id === "integracion" ? (
                            <IntegrationsPreview />
                        ) : (
                            <KPIDashboard />
                        )}
                    </div>

                    {/* Subtle micro-glow behind the panel */}
                    <div className="absolute -inset-4 bg-brand-blue-primary/5 blur-[100px] -z-10 rounded-full" />
                </div>
            </div>
        </SectionWrapper>
    );
};
