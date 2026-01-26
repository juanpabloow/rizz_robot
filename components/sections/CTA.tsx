"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

export const CTA = () => {
    return (
        <SectionWrapper id="cta">
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center border border-brand-blue-primary/30">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-900 via-brand-black to-brand-black z-0" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-blue-primary to-transparent opacity-50" />
                <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-blue-primary/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        ¿Listo para que <span className="text-brand-blue-primary">RespondAi</span> trabaje por ti?
                    </h2>
                    <p className="text-lg text-brand-gray-400">
                        Agenda una demostración personalizada y descubre cómo podemos automatizar tu negocio hoy mismo.
                    </p>

                    <form className="space-y-4 text-left max-w-md mx-auto bg-brand-black/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="name" className="block text-xs font-medium text-brand-gray-400 mb-1">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-brand-gray-900 border border-brand-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue-primary focus:ring-1 focus:ring-brand-blue-primary transition-colors"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-brand-gray-400 mb-1">Email Corporativo</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-brand-gray-900 border border-brand-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue-primary focus:ring-1 focus:ring-brand-blue-primary transition-colors"
                                placeholder="tu@empresa.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs font-medium text-brand-gray-400 mb-1">Mensaje (Opcional)</label>
                            <textarea
                                id="message"
                                rows={3}
                                className="w-full bg-brand-gray-900 border border-brand-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue-primary focus:ring-1 focus:ring-brand-blue-primary transition-colors resize-none"
                                placeholder="¿Qué proceso quieres automatizar?"
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                            Solicitar Demo
                        </Button>
                        <p className="text-center text-[10px] text-brand-gray-500">
                            Respuesta garantizada en menos de 24h.
                        </p>
                    </form>

                    <div className="pt-4">
                        <button className="text-sm text-brand-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto">
                            <MessageCircle size={16} />
                            Prefiero contactar por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
