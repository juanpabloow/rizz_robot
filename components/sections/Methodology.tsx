"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight } from "lucide-react";

const phases = [
    {
        id: "01",
        title: "Revelación",
        description: "Definimos el flujo del proceso, requerimientos técnicos, sistemas a integrar y criterios de éxito.",
        bullets: [
            "PRD y flujo operativo",
            "Identificación de integraciones",
            "Parámetros y datos de entrada",
            "KPIs y métricas de éxito",
            "Gestión de errores y alertas"
        ]
    },
    {
        id: "02",
        title: "Estructuración",
        description: "Construimos un prototipo funcional en días y desarrollamos el workflow completo del agente.",
        bullets: [
            "V0 funcional en 1–2 días",
            "Triggers (Webhook, email, files)",
            "Agente IA con prompts y tools",
            "Extracción y clasificación",
            "Lógica personalizada y reintentos"
        ]
    },
    {
        id: "03",
        title: "Testeo",
        description: "Iteramos con datos reales para optimizar precisión, comportamiento y clasificación.",
        bullets: [
            "Testing interno 2–3 semanas",
            "Pilotos en lotes controlados",
            "Ajuste de prompts y extracción",
            "Refinamiento con edge cases reales"
        ]
    },
    {
        id: "04",
        title: "Despliegue",
        description: "Escalamos progresivamente hasta operación estable con monitoreo continuo.",
        bullets: [
            "Ramp-up gradual",
            "Monitoreo 24/7",
            "Logging automático enterprise",
            "Integraciones vía API/SFTP"
        ]
    }
];

export const Methodology = () => {
    const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

    return (
        <SectionWrapper id="methodology" className="relative overflow-hidden">
            {/* Background Elements */}


            <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-6">
                    Metodología
                </h2>
                <p className="text-brand-gray-400 text-lg">
                    Un framework estructurado para diseñar, construir y escalar agentes de IA de forma controlada y medible.
                </p>
            </div>

            <div className="relative z-10">
                {/* Desktop Timeline Connection Line */}
                <div className="hidden lg:block absolute top-[180px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gray-800 to-transparent -z-10" />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.id}
                            className="group relative"
                            onMouseEnter={() => setHoveredPhase(phase.id)}
                            onMouseLeave={() => setHoveredPhase(null)}
                        >
                            {/* Mobile Connector Line */}
                            {index !== phases.length - 1 && (
                                <div className="lg:hidden absolute left-[27px] top-[60px] bottom-[-32px] w-[1px] bg-brand-gray-800" />
                            )}

                            <div className={cn(
                                "relative p-6 rounded-2xl transition-all duration-300 border h-full flex flex-col",
                                hoveredPhase === phase.id
                                    ? "bg-white/[0.03] border-brand-blue-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                                    : "bg-transparent border-white/5 hover:border-white/10"
                            )}>
                                {/* Number */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={cn(
                                        "w-14 h-14 rounded-full flex items-center justify-center text-xl font-mono font-bold tracking-tighter border transition-all duration-300 bg-[#0B0D12]",
                                        hoveredPhase === phase.id
                                            ? "border-brand-blue-primary text-brand-blue-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                            : "border-brand-gray-800 text-brand-gray-600 group-hover:border-brand-gray-700"
                                    )}>
                                        {phase.id}
                                    </div>
                                    <h3 className={cn(
                                        "text-xl font-bold transition-colors duration-300",
                                        hoveredPhase === phase.id ? "text-white" : "text-brand-gray-300"
                                    )}>
                                        {phase.title}
                                    </h3>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <p className="text-brand-gray-400 text-sm leading-relaxed mb-4">
                                        {phase.description}
                                    </p>

                                    {/* Expandable Details */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: hoveredPhase === phase.id ? 'auto' : 0,
                                            opacity: hoveredPhase === phase.id ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="overflow-hidden lg:block hidden"
                                    >
                                        <ul className="space-y-2 pt-2 border-t border-white/5 mt-4">
                                            {phase.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-brand-gray-500">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue-primary/70 mt-0.5 shrink-0" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    {/* Always visible details on Mobile */}
                                    <ul className="lg:hidden block space-y-2 pt-4 border-t border-white/5 mt-2">
                                        {phase.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-brand-gray-500">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue-primary/50 mt-1.5 shrink-0" />
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};
