"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { XCircle, CheckCircle } from "lucide-react";

export const ProblemSolution = () => {
    return (
        <SectionWrapper id="solution">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Problem */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            El costo de la atención tradicional
                        </h2>
                        <p className="text-brand-gray-400">
                            Escalar equipos humanos es costoso, lento y propenso a errores. Tu crecimiento no debería estar limitado por la capacidad operativa.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            "Leads perdidos por respuestas lentas",
                            "Soporte 24/7 inalcanzable por costos",
                            "Errores humanos en tareas repetitivas",
                            "Falta de seguimiento en ventas",
                        ].map((item, idx) => (
                            <Card key={idx} className="flex items-center gap-4 border-red-500/10 bg-red-500/5 hover:border-red-500/20">
                                <XCircle className="text-red-500 shrink-0" size={24} />
                                <span className="text-gray-300 font-medium">{item}</span>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Solution */}
                <div className="relative mt-8 md:mt-0">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-[1px] bg-gradient-to-r from-red-500/20 to-brand-blue-primary/50" />

                    <div className="space-y-8 p-8 rounded-3xl border border-brand-blue-primary/20 bg-brand-blue-primary/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-brand-blue-primary/5 blur-3xl rounded-full" />

                        <div className="relative z-10 space-y-2">
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                La ventaja <span className="text-brand-blue-primary">RespondAi</span>
                            </h2>
                            <p className="text-brand-gray-400">
                                Automatización inteligente que se siente humana, responde al instante y escala infinitamente.
                            </p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            {[
                                "Respuestas instantáneas 24/7",
                                "Reducción de costos operativos hasta 70%",
                                "Precisión absoluta en datos y CRM",
                                "Seguimiento automatizado para más cierres",
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle className="text-brand-blue-primary shrink-0" size={20} />
                                    <span className="text-white font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
