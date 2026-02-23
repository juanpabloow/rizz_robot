"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

// --- Chat Demo Components ---

interface Message {
    id: number;
    text: string;
    sender: "client" | "agent" | "system";
}

type SequenceStep =
    | { type: "user_typing"; text: string; duration: number }
    | { type: "user_send"; duration: number }
    | { type: "client_msg"; id: number; text: string }
    | { type: "thinking"; duration: number }
    | { type: "agent_msg"; id: number; text: string }
    | { type: "system_msg"; id: number; text: string };

const CHAT_SEQUENCE: SequenceStep[] = [
    // Step 1: User types "Hola, quiero..."
    { type: "user_typing", text: "Hola, quiero saber si tienen disponibilidad esta semana.", duration: 2000 },
    { type: "user_send", duration: 300 }, // click & send
    { type: "client_msg", id: 1, text: "Hola, quiero saber si tienen disponibilidad esta semana." },

    // Step 2: Agent thinks & responds
    { type: "thinking", duration: 1500 },
    { type: "agent_msg", id: 2, text: "Claro. Tengo disponibilidad este jueves a las 10:30am o viernes a las 9:00am. ¿Cuál te viene mejor?" },

    // Step 3: User types "El jueves..."
    { type: "user_typing", text: "El jueves está perfecto.", duration: 1500 },
    { type: "user_send", duration: 300 },
    { type: "client_msg", id: 3, text: "El jueves está perfecto." },

    // Step 4: Agent thinks & confirms
    { type: "thinking", duration: 1000 },
    { type: "agent_msg", id: 4, text: "Listo. He reservado tu cita para el jueves a las 10:30am. Te enviaré un recordatorio antes de la reunión." },

    // Step 5: System Confirmation
    { type: "system_msg", id: 5, text: "Cita agendada" }
];

export const ChatDemo = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isThinking, setIsThinking] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Intersection Observer to start animation only when in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setHasStarted(true);
                } else {
                    // Reset when out of view to replay nicely on re-entry
                    setHasStarted(false);
                    setMessages([]);
                    setCurrentIndex(0);
                    setIsThinking(false);
                    setInputText("");
                    setIsSending(false);
                }
            },
            { threshold: 0.4 } // 40% visible to trigger
        );

        const element = document.getElementById("chat-demo-container");
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasStarted) return;

        let timeout: NodeJS.Timeout;

        const runSequence = async () => {
            if (currentIndex < CHAT_SEQUENCE.length) {
                const step = CHAT_SEQUENCE[currentIndex];

                if (step.type === "user_typing") {
                    // Simulate typing animation frame by frame
                    const totalChars = step.text.length;
                    const charDelay = step.duration / totalChars;

                    let charIndex = 0;
                    const typeChar = () => {
                        if (charIndex <= totalChars) {
                            setInputText(step.text.substring(0, charIndex));
                            charIndex++;
                            timeout = setTimeout(typeChar, charDelay);
                        } else {
                            setCurrentIndex((prev) => prev + 1);
                        }
                    };
                    typeChar();

                } else if (step.type === "user_send") {
                    setIsSending(true);
                    timeout = setTimeout(() => {
                        setIsSending(false);
                        setInputText(""); // Clear input
                        setCurrentIndex((prev) => prev + 1);
                    }, step.duration);

                } else if (step.type === "client_msg") {
                    setMessages((prev) => [...prev, { id: step.id, text: step.text, sender: "client" }]);
                    timeout = setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                    }, 500); // Small pause after msg appears

                } else if (step.type === "thinking") {
                    setIsThinking(true);
                    timeout = setTimeout(() => {
                        setIsThinking(false);
                        setCurrentIndex((prev) => prev + 1);
                    }, step.duration);

                } else if (step.type === "agent_msg") {
                    setMessages((prev) => [...prev, { id: step.id, text: step.text, sender: "agent" }]);
                    timeout = setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                    }, 1000); // Reading pause

                } else if (step.type === "system_msg") {
                    setMessages((prev) => [...prev, { id: step.id, text: step.text, sender: "system" }]);
                    timeout = setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                    }, 2000); // Pause before sequence ends
                }
            } else {
                // Sequence finished, wait 5s and restart if still visible
                timeout = setTimeout(() => {
                    if (hasStarted) {
                        setMessages([]);
                        setCurrentIndex(0);
                        setIsThinking(false);
                        setInputText("");
                        setIsSending(false);
                    }
                }, 5000);
            }
        };

        runSequence();
        return () => clearTimeout(timeout);
    }, [currentIndex, hasStarted]);

    return (
        <div id="chat-demo-container" className="w-full h-full flex flex-col bg-[#0B0D12] rounded-xl overflow-hidden shadow-2xl border border-white/5 font-sans">
            {/* Header / Agent Info */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-white/[0.02]">
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-blue-primary to-brand-blue-accent flex items-center justify-center shadow-lg shadow-brand-blue-primary/20">
                        <div className="w-4 h-4 bg-white/20 rounded-full blur-[1px]" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#0B0D12] rounded-full"></div>
                </div>
                <div>
                    <div className="text-xs font-bold text-white tracking-wide">MontserratAI Agent</div>
                    <div className="text-[10px] text-brand-gray-400 font-medium tracking-tight">En línea</div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto no-scrollbar relative">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={cn(
                                "max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed relative",
                                msg.sender === "client" && "self-end bg-brand-blue-primary text-white rounded-tr-none shadow-md shadow-brand-blue-primary/10",
                                msg.sender === "agent" && "self-start bg-[#1C1F26] text-gray-100 rounded-tl-none border border-white/5",
                                msg.sender === "system" && "self-center my-2 px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                            )}
                        >
                            {msg.sender === "system" && <Calendar className="w-3.5 h-3.5" />}
                            {msg.text}
                        </motion.div>
                    ))}

                    {/* Liquid Purple Orb (Thinking State) */}
                    {isThinking && (
                        <motion.div
                            key="thinking-orb"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                            className="self-start flex items-center gap-3 mt-1"
                        >
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                {/* Core Orb */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-4 h-4 rounded-full bg-purple-600 blur-[2px] shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                                />
                                {/* Liquid Outer Glow */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"
                                />
                            </div>
                            {/* Optional subtle status text */}
                            <span className="text-[10px] font-medium text-purple-400/60 tracking-wider uppercase animate-pulse">Procesando</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area (POV User) */}
            <div className="p-4 bg-[#0B0D12] border-t border-white/5">
                <div className="relative flex items-center bg-[#15171C] rounded-full border border-white/5 px-4 py-3 shadow-inner">
                    <div className="flex-1 text-sm text-gray-300 font-medium min-h-[20px] flex items-center">
                        {inputText}
                        {/* Cursor caret always verifying 'typing' state isn't strictly needed for cursor, just input focus simulation */}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-[2px] h-4 bg-brand-blue-primary ml-0.5 inline-block"
                        />
                    </div>
                    <motion.div
                        animate={isSending ? { scale: 0.9 } : { scale: 1 }}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200",
                            inputText.length > 0 ? "bg-brand-blue-primary text-white shadow-lg shadow-brand-blue-primary/20" : "bg-[#252830] text-gray-500"
                        )}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </motion.div>
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
