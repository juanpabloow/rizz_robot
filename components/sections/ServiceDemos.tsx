"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- Chat Demo Components ---

interface Message {
    id: number;
    text: string;
    sender: "client" | "agent";
    isThinking?: boolean;
    thinkingText?: string;
}

const CHAT_SEQUENCE: (Message | { type: "thinking", text: string, sender: "agent", duration: number })[] = [
    { id: 1, text: "Hola, quiero saber si tienen disponibilidad esta semana.", sender: "client" },
    { type: "thinking", text: "Comprobando disponibilidad...", sender: "agent", duration: 1200 },
    { id: 2, text: "Claro. Tengo disponibilidad este jueves a las 10:30am o viernes a las 9:00am. ¿Cuál te viene mejor?", sender: "agent" },
    { id: 3, text: "El jueves está perfecto.", sender: "client" },
    { type: "thinking", text: "Confirmando agenda...", sender: "agent", duration: 800 },
    { id: 4, text: "Listo. He reservado tu cita para el jueves a las 10:30am. Te enviaré un recordatorio antes de la reunión.", sender: "agent" },
];

export const ChatDemo = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isThinking, setIsThinking] = useState(false);
    const [thinkingText, setThinkingText] = useState("");

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const runSequence = async () => {
            if (currentIndex < CHAT_SEQUENCE.length) {
                const step = CHAT_SEQUENCE[currentIndex];

                if ("type" in step && step.type === "thinking") {
                    setIsThinking(true);
                    setThinkingText(step.text);
                    timeout = setTimeout(() => {
                        setIsThinking(false);
                        setCurrentIndex((prev) => prev + 1);
                    }, step.duration);
                } else {
                    const msg = step as Message;
                    setMessages((prev) => {
                        // Prevent duplicate messages in the list (especially important in Dev/StrictMode)
                        if (prev.some(m => m.id === msg.id)) return prev;
                        return [...prev, msg];
                    });
                    timeout = setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                    }, 1500);
                }
            } else {
                // End of sequence
                timeout = setTimeout(() => {
                    setMessages([]);
                    setCurrentIndex(0);
                }, 3000);
            }
        };

        runSequence();
        return () => clearTimeout(timeout);
    }, [currentIndex]);

    return (
        <div className="w-full h-full flex flex-col p-6 bg-linear-to-br from-[#F2F6FB] to-[#EEF2F7] rounded-xl overflow-hidden shadow-inner">
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={cn(
                                "max-w-[80%] p-4 rounded-2xl text-sm font-medium",
                                msg.sender === "client"
                                    ? "self-end bg-[#E5EBF2] text-brand-gray-700 rounded-tr-none"
                                    : "self-start bg-[#0B0D12] text-white rounded-tl-none shadow-lg shadow-black/10"
                            )}
                        >
                            {msg.text}
                        </motion.div>
                    ))}

                    {isThinking && (
                        <motion.div
                            key="thinking"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                                opacity: [0.85, 1, 0.85],
                                scale: [1, 1.04, 1]
                            }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="self-start bg-[#0B0D12] text-white/70 p-4 rounded-2xl rounded-tl-none text-sm font-medium shadow-lg shadow-black/10 flex items-center gap-2"
                        >
                            <span className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-brand-blue-primary rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-brand-blue-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-brand-blue-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                            </span>
                            {thinkingText}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Avatar Decoration */}
            <div className="mt-4 flex items-center gap-3 border-t border-brand-gray-200 pt-4">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-blue-primary to-brand-blue-accent flex items-center justify-center shadow-lg shadow-brand-blue-primary/20">
                    <div className="w-4 h-4 bg-white/20 rounded-full blur-[2px]" />
                </div>
                <div className="text-[10px] font-bold text-brand-gray-400 uppercase tracking-widest">
                    RespondAi Agent
                </div>
            </div>
        </div>
    );
};

// --- Calls Demo Component ---

export const CallsDemo = () => {
    const [status, setStatus] = useState("Conectando...");

    useEffect(() => {
        const interval = setInterval(() => {
            setStatus(prev => {
                if (prev === "Conectando...") return "En llamada...";
                if (prev === "En llamada...") return "Cita agendada";
                return "Conectando...";
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-brand-black/40 rounded-xl border border-white/5">
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                {/* Circular Waveform Animation */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 border-2 border-brand-blue-primary/30 rounded-full"
                        animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut",
                        }}
                    />
                ))}
                <div className="w-24 h-24 rounded-full bg-brand-blue-primary/10 border border-brand-blue-primary/20 flex items-center justify-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-brand-blue-primary/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-brand-blue-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                    </div>
                </div>
            </div>

            <div className="text-center space-y-2">
                <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white font-medium text-lg tracking-tight"
                >
                    {status}
                </motion.div>
                <div className="flex gap-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 h-4 bg-brand-blue-primary/40 rounded-full"
                            animate={{
                                height: [4, 12, 4],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Handoff Demo Component ---

export const HandoffDemo = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        "Detectando complejidad...",
        "Escalando a agente",
        "Contexto enviado"
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-brand-black/40 rounded-xl border border-white/5">
            <div className="flex items-center gap-8 relative max-w-sm w-full">
                {/* Connector Lines */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-gray-700 to-transparent -translate-y-1/2" />

                <div className="flex-1 flex flex-col items-center gap-4 relative z-10">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500",
                        step >= 0 ? "bg-brand-blue-primary/20 border-brand-blue-primary/40 border" : "bg-brand-gray-800 border-brand-gray-700 border"
                    )}>
                        <div className="w-6 h-6 rounded-lg bg-brand-blue-primary/40" />
                    </div>
                    <div className="text-[10px] text-brand-gray-400 font-bold uppercase tracking-tighter">AI AGENT</div>
                </div>

                <motion.div
                    className="w-8 h-8 flex items-center justify-center"
                    animate={{ x: [0, 40, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <div className="w-2 h-2 rounded-full bg-brand-blue-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                </motion.div>

                <div className="flex-1 flex flex-col items-center gap-4 relative z-10">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500",
                        step >= 1 ? "bg-white/10 border-white/20 border" : "bg-brand-gray-800 border-brand-gray-700 border"
                    )}>
                        <div className="w-6 h-6 rounded-lg bg-white/20" />
                    </div>
                    <div className="text-[10px] text-brand-gray-400 font-bold uppercase tracking-tighter">HUMAN</div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white font-medium mb-2"
                >
                    {steps[step]}
                </motion.div>
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-2 h-2 rounded-full transition-colors duration-300",
                                i === step ? "bg-brand-blue-primary" : "bg-brand-gray-800"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
