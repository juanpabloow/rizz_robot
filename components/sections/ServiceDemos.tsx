"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

// --- Chat Demo Components ---

interface Message {
    id: number;
    text: string;
    sender: "client" | "agent" | "system";
    intent?: string;
    confidence?: string;
    eligibility?: string;
    refundMethod?: string;
}

type SequenceStep =
    | { type: "user_typing"; text: string; duration: number }
    | { type: "user_send"; duration: number }
    | { type: "client_msg"; id: number; text: string }
    | { type: "action_logs"; logs: string[]; duration: number }
    | { type: "agent_msg"; id: number; text: string; intent?: string; confidence?: string; eligibility?: string; refundMethod?: string; readDuration?: number }
    | { type: "system_msg"; id: number; text: string; readDuration?: number };

const CHAT_SEQUENCE: SequenceStep[] = [
    // Step 1: User types
    { type: "user_typing", text: "Quiero devolver mi pedido", duration: 1400 },
    { type: "user_send", duration: 300 },
    { type: "client_msg", id: 1, text: "Quiero devolver mi pedido" },

    // Step 2: Agent reads intent & executes actions
    {
        type: "action_logs",
        logs: [
            "Analizando intención del cliente"
        ],
        duration: 800
    },
    {
        type: "agent_msg",
        id: 2,
        text: "Claro, ¿puedes darme el numero de tu pedido, por favor?",
        intent: "Devolución",
        readDuration: 1800
    },

    // Step 3: User confirms order
    { type: "user_typing", text: "Es el TQM67", duration: 700 },
    { type: "user_send", duration: 200 },
    { type: "client_msg", id: 3, text: "Es el TQM67" },

    // Step 4: Agent executes verification and refund
    {
        type: "action_logs",
        logs: [
            "Validando pedido TQM67"
        ],
        duration: 800
    },
    {
        type: "agent_msg",
        id: 4,
        text: "Gracias, he iniciado el proceso de reembolso.",
        intent: "ID pedido",
        eligibility: "Aprobada",
        refundMethod: "Tarjeta",
        readDuration: 2000
    },

    // Step 5: System Confirmation
    { type: "system_msg", id: 5, text: "Reembolso procesado", readDuration: 2500 }
];

export const ChatDemo = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputText, setInputText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Action Logs State
    const [isProcessingLogs, setIsProcessingLogs] = useState(false);
    const [activeLogs, setActiveLogs] = useState<string[]>([]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messages, activeLogs, isProcessingLogs]);

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
                    setIsProcessingLogs(false);
                    setActiveLogs([]);
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
                    }, 1200); // Increased pause to read client msg

                } else if (step.type === "action_logs") {
                    setIsProcessingLogs(true);
                    let logIndex = 0;
                    const logDelay = step.duration / step.logs.length;

                    const cascadeLogs = () => {
                        if (logIndex < step.logs.length) {
                            const newLog = step.logs[logIndex];
                            setActiveLogs(prev => {
                                const next = [...prev, newLog];
                                // Keep up to 6 logs visible as requested
                                return next.length > 6 ? next.slice(next.length - 6) : next;
                            });
                            logIndex++;
                            timeout = setTimeout(cascadeLogs, logDelay);
                        } else {
                            // Finish logs, slight pause to let user read the last log before hiding
                            timeout = setTimeout(() => {
                                setIsProcessingLogs(false);
                                setActiveLogs([]);
                                setCurrentIndex((prev) => prev + 1);
                            }, 400);
                        }
                    };
                    cascadeLogs();

                } else if (step.type === "agent_msg") {
                    setMessages((prev) => [...prev, {
                        id: step.id,
                        text: step.text,
                        sender: "agent",
                        intent: step.intent,
                        confidence: step.confidence,
                        eligibility: step.eligibility,
                        refundMethod: step.refundMethod
                    }]);
                    timeout = setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                    }, step.readDuration || 3000);

                } else if (step.type === "system_msg") {
                    setMessages((prev) => [...prev, { id: step.id, text: step.text, sender: "system" }]);
                    timeout = setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                    }, step.readDuration || 3500);
                }
            } else {
                // Sequence finished, wait 5s and restart if still visible
                timeout = setTimeout(() => {
                    if (hasStarted) {
                        setMessages([]);
                        setCurrentIndex(0);
                        setIsProcessingLogs(false);
                        setActiveLogs([]);
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
            <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-white/2">
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
            <div ref={scrollContainerRef} className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto no-scrollbar relative">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={cn(
                                "max-w-[85%] relative flex flex-col gap-1.5",
                                msg.sender === "client" ? "self-end items-end" : "self-start items-start",
                                msg.sender === "system" && "self-center items-center"
                            )}
                        >
                            <div className={cn(
                                "p-3.5 rounded-2xl text-sm leading-relaxed",
                                msg.sender === "client" && "bg-brand-blue-primary text-white rounded-tr-none shadow-md shadow-brand-blue-primary/10",
                                msg.sender === "agent" && "bg-[#1C1F26] text-gray-100 rounded-tl-none border border-white/5",
                                msg.sender === "system" && "px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                            )}>
                                {msg.sender === "system" && <Calendar className="w-3.5 h-3.5" />}
                                {msg.text}
                            </div>

                            {/* Visual Decision Engine */}
                            {msg.sender === "agent" && msg.intent && (
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1 text-[9px] font-mono text-brand-gray-500/80 mt-1.5 opacity-80">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 rounded-full bg-brand-blue-primary/40" />
                                        <span className="uppercase tracking-wider">Intención:</span>
                                        <span className="text-brand-gray-400">{msg.intent}</span>
                                    </div>
                                    {msg.eligibility && (
                                        <div className="flex items-center gap-1.5 after:content-[''] after:w-px after:h-2 after:bg-brand-gray-800 after:ml-1.5 last:after:hidden">
                                            <span className="uppercase tracking-wider">Elegibilidad:</span>
                                            <span className="text-brand-blue-primary/70">{msg.eligibility}</span>
                                        </div>
                                    )}
                                    {msg.refundMethod && (
                                        <div className="flex items-center gap-1.5">
                                            <span className="uppercase tracking-wider">Método:</span>
                                            <span className="text-brand-blue-primary/70">{msg.refundMethod}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* Action Logs Panel (Micro-events inline like a bubble) */}
                    {isProcessingLogs && (
                        <motion.div
                            key="action-logs"
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="self-start max-w-[85%] bg-brand-gray-900/40 backdrop-blur-md text-gray-100 rounded-2xl rounded-tl-none border border-white/5 p-3.5 shadow-xl flex flex-col gap-1.5"
                        >
                            <div className="text-[9px] font-bold text-brand-blue-primary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue-primary animate-ping" />
                                Operaciones en curso
                            </div>
                            <div className="flex flex-col gap-1.5 overflow-hidden">
                                <AnimatePresence mode="popLayout">
                                    {activeLogs.map((log, idx) => (
                                        <motion.div
                                            key={`${log}-${idx}`}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                                            transition={{ duration: 0.4 }}
                                            className="text-[11px] text-brand-gray-300 font-medium leading-tight flex items-start gap-1.5"
                                        >
                                            <span className="text-brand-blue-primary/60 mt-px">✓</span>
                                            <span>{log}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
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
