"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MessageSquare, Phone, UserCog, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatDemo, CallsDemo, HandoffDemo } from "./ServiceDemos";

const services = [
    {
        id: "atencion-ia",
        title: "Atención al Cliente IA",
        description: "Respuestas instantáneas y precisas en WhatsApp, chat web y email.",
        icon: <MessageSquare size={20} />,
        features: ["Entrenamiento con tus datos", "Tono de marca personalizado", "Escalado infinito"],
        Demo: ChatDemo,
    },
    {
        id: "llamadas-ia",
        title: "Llamadas Inteligentes",
        description: "Agentes de voz que agendan citas, califican leads y resuelven objeciones.",
        icon: <Phone size={20} />,
        features: ["Voz natural y controlada", "Manejo de objeciones", "Integración con Calendario/CRM"],
        Demo: CallsDemo,
    },
    {
        id: "handoff-humano",
        title: "Handoff a Humanos",
        description: "Transferencia inteligente cuando la IA detecta complejidad o riesgo.",
        icon: <UserCog size={20} />,
        features: ["Contexto completo y trazabilidad", "Detección de sentimiento", "Alertas en tiempo real"],
        Demo: HandoffDemo,
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
                            <div className="p-5 flex items-start gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300",
                                    activeIndex === idx
                                        ? "bg-brand-blue-primary text-white"
                                        : "bg-brand-gray-800 text-brand-gray-400 group-hover:text-white"
                                )}>
                                    {service.icon}
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
                                                <ul className="mt-4 space-y-2">
                                                    {service.features.map((feature, fIdx) => (
                                                        <li key={fIdx} className="flex items-center gap-2 text-xs text-brand-gray-400">
                                                            <div className="w-1 h-1 bg-brand-blue-primary rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Columna Derecha: Panel Demo (58-62%) */}
                <div className="w-full lg:w-[60%] sticky top-24">
                    <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden glass-card border border-white/5 shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                {(() => {
                                    const ActiveDemo = services[activeIndex].Demo;
                                    return <ActiveDemo />;
                                })()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Subtle micro-glow behind the panel */}
                    <div className="absolute -inset-4 bg-brand-blue-primary/5 blur-[100px] -z-10 rounded-full" />
                </div>
            </div>
        </SectionWrapper>
    );
};
