"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const pillars = [
    {
        number: "01",
        title: "Arquitectura operativa real",
        description:
            "Nuestros agentes no solo responden mensajes. Ejecutan flujos completos, interactúan con sistemas empresariales y toman decisiones basadas en reglas, contexto y datos históricos.",
        points: [
            "Integración profunda con CRM, ERP y APIs",
            "Lógica personalizada por industria",
            "Control total sobre triggers y excepciones",
        ],
    },
    {
        number: "02",
        title: "Medición y optimización continua",
        description:
            "Cada interacción genera datos accionables. Medimos desempeño, detectamos fricciones y optimizamos el comportamiento del agente de forma iterativa.",
        points: [
            "KPIs definidos desde la fase de discovery",
            "Clasificación automática de resultados",
            "Mejora progresiva basada en datos reales",
        ],
    },
    {
        number: "03",
        title: "Escalabilidad sin fricción",
        description:
            "La implementación evoluciona contigo. Validamos resultados en etapas iniciales y ampliamos alcance con base en desempeño real, manteniendo estabilidad operativa.",
        points: [
            "Despliegue progresivo",
            "Seguimiento constante de resultados",
            "Preparado para incrementos sostenidos de demanda",
        ],
    },
];

export const Benefits = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
        },
    };

    return (
        <SectionWrapper id="benefits" className="relative py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={sectionRef}>
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl mb-20 md:mb-28"
                >
                    <p className="text-brand-blue-primary text-xs md:text-sm font-semibold tracking-widest uppercase mb-4">
                        Por qué elegir Montserrat AI
                    </p>
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
                        Infraestructura de agentes diseñada para operar en entornos reales.
                    </h2>
                    <p className="text-lg md:text-xl text-brand-gray-400 font-normal leading-relaxed">
                        No construimos chatbots. Diseñamos sistemas autónomos que ejecutan, miden y optimizan procesos críticos.
                    </p>
                </motion.div>

                {/* 3 Pillars Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12"
                >
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="flex flex-col relative group cursor-pointer md:cursor-auto"
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    setExpandedIndex(expandedIndex === idx ? null : idx);
                                }
                            }}
                        >
                            {/* Line connecting the layout (desktop focus) */}
                            <div className="hidden md:block absolute top-0 left-0 w-full h-px bg-brand-gray-800" />
                            <div className="hidden md:block absolute top-0 left-0 h-px w-0 bg-brand-blue-primary transition-all duration-700 ease-out group-hover:w-full" />

                            {/* Top decorative number & Mobile Toggle */}
                            <div className="pt-6 md:pt-8 mb-4 md:mb-6 flex justify-between items-center">
                                <span className="text-sm font-mono tracking-widest text-brand-blue-primary/80">
                                    {pillar.number}
                                </span>
                                <span className="md:hidden text-brand-gray-500">
                                    {expandedIndex === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-medium text-white mb-2 md:mb-4 pr-6 md:pr-0">
                                {pillar.title}
                            </h3>

                            {/* Collapsible Content */}
                            <AnimatePresence initial={false}>
                                {(expandedIndex === idx || (typeof window !== 'undefined' && window.innerWidth >= 768) || true) && (
                                    <motion.div
                                        key="content"
                                        initial={false}
                                        animate={{ height: "auto", opacity: 1 }}
                                        className={cn(
                                            "md:block! overflow-hidden transition-all duration-300 md:opacity-100",
                                            expandedIndex === idx ? "max-h-[500px] opacity-100 pt-2" : "max-h-0 opacity-0 md:max-h-[1000px]"
                                        )}
                                    >
                                        <p className="text-base text-brand-gray-400 leading-relaxed mb-6 md:mb-8">
                                            {pillar.description}
                                        </p>

                                        {/* Points list */}
                                        <ul className="mb-4 mt-auto space-y-3">
                                            {pillar.points.map((point, pIdx) => (
                                                <li key={pIdx} className="flex items-start text-sm text-brand-gray-500">
                                                    <span className="mr-3 text-brand-blue-primary opacity-50 font-bold">·</span>
                                                    <span className="leading-snug">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
