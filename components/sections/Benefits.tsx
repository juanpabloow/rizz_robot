"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Zap, TrendingUp, ShieldCheck, Clock, Layers, Headphones } from "lucide-react";

const benefits = [
    {
        title: "Respuesta Inmediata",
        description: "Reduce el tiempo de primera respuesta a segundos, no horas.",
        icon: <Zap className="text-yellow-400" />,
    },
    {
        title: "Mayor Conversión",
        description: "Captura leads calientes al instante y agenda automáticamente.",
        icon: <TrendingUp className="text-green-400" />,
    },
    {
        title: "Cero Errores",
        description: "Elimina errores humanos en la recolección de datos y procesos.",
        icon: <ShieldCheck className="text-brand-blue-primary" />,
    },
    {
        title: "Disponibilidad 24/7",
        description: "Tu negocio nunca duerme. Atiende clientes mientras descansas.",
        icon: <Clock className="text-purple-400" />,
    },
    {
        title: "Integración Total",
        description: "Se conecta con tu CRM, Calendario y herramientas actuales.",
        icon: <Layers className="text-pink-400" />,
    },
    {
        title: "Consistencia de Marca",
        description: "La IA mantiene tu tono de voz y políticas en cada interacción.",
        icon: <Headphones className="text-orange-400" />,
    },
];

export const Benefits = () => {
    return (
        <SectionWrapper id="benefits" className="bg-brand-black/50">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                    Por qué elegir MontserratAI
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {benefits.map((benefit, idx) => (
                    <Card key={idx} className="hover:bg-brand-gray-800/20 transition-colors border-brand-gray-800">
                        <div className="mb-4 bg-brand-gray-800/50 w-10 h-10 rounded-lg flex items-center justify-center">
                            {benefit.icon}
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-white mb-2">{benefit.title}</h3>
                        <p className="text-sm text-brand-gray-400 leading-relaxed">
                            {benefit.description}
                        </p>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
};
