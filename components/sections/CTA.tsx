"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const CTA = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        console.log("Form submission triggered", { name, email });
        setStatus("loading");
        setErrorMessage("");

        try {
            const { error } = await supabase
                .from("demo_requests")
                .insert([{ name, email, message }]);

            if (error) throw error;
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
        } catch (error: any) {
            console.error("Error submitting demo request:", error);
            setStatus("error");
            setErrorMessage(error.message || "An error occurred");
        }
    };

    return (
        <SectionWrapper id="cta">
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center border border-brand-blue-primary/30">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-brand-gray-900 via-brand-black to-brand-black z-0" />
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-blue-primary to-transparent opacity-50" />
                <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-blue-primary/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        ¿Listo para que <span className="text-brand-blue-primary">MontserratAI</span> trabaje por ti?
                    </h2>
                    <p className="text-lg text-brand-gray-400">
                        Agenda una demostración personalizada y descubre cómo podemos automatizar tu negocio hoy mismo.
                    </p>

                    {status === "success" ? (
                        <div className="max-w-md mx-auto bg-brand-black/50 p-8 rounded-2xl border border-brand-blue-primary/30 backdrop-blur-sm space-y-4">
                            <div className="w-16 h-16 bg-brand-blue-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-brand-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-white">¡Solicitud Enviada!</h3>
                            <p className="text-sm text-brand-gray-400">
                                Nos pondremos en contacto contigo proximamente.
                            </p>
                            <Button variant="outline" onClick={() => setStatus("idle")} className="mt-4">
                                Enviar otra solicitud
                            </Button>
                        </div>
                    ) : (
                        <form className="space-y-4 text-left max-w-md mx-auto bg-brand-black/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm" onSubmit={handleSubmit}>
                            {status === "error" && (
                                <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg">
                                    {errorMessage}
                                </div>
                            )}
                            <div>
                                <label htmlFor="name" className="block text-xs font-medium text-brand-gray-400 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-brand-gray-900 border border-brand-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue-primary focus:ring-1 focus:ring-brand-blue-primary transition-colors disabled:opacity-50"
                                    placeholder="Tu nombre"
                                    disabled={status === "loading"}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-brand-gray-400 mb-1">Email Corporativo</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-brand-gray-900 border border-brand-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue-primary focus:ring-1 focus:ring-brand-blue-primary transition-colors disabled:opacity-50"
                                    placeholder="tu@empresa.com"
                                    disabled={status === "loading"}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-xs font-medium text-brand-gray-400 mb-1">Mensaje (Opcional)</label>
                                <textarea
                                    id="message"
                                    rows={3}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-brand-gray-900 border border-brand-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue-primary focus:ring-1 focus:ring-brand-blue-primary transition-colors resize-none disabled:opacity-50"
                                    placeholder="¿Qué proceso quieres automatizar?"
                                    disabled={status === "loading"}
                                />
                            </div>

                            <Button type="submit" onClick={handleSubmit} className="w-full" size="lg" disabled={status === "loading"}>
                                {status === "loading" ? "Enviando..." : "Solicitar Demo"}
                            </Button>
                        </form>
                    )}

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
