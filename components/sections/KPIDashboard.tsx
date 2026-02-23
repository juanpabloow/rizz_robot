"use client";

import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Clock, MessageSquare, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";

// --- Mock Data ---

// KPI Data
const stats = [
    {
        label: "Conversaciones",
        value: "12,480",
        delta: "+12%",
        icon: MessageSquare,
        color: "text-blue-400",
    },
    {
        label: "Tiempo ahorrado",
        value: "214 h",
        delta: "+8%",
        icon: Clock,
        color: "text-emerald-400",
    },
    {
        label: "Resolución AI",
        value: "68%",
        delta: "+5%",
        icon: Zap,
        color: "text-purple-400",
    },
    {
        label: "CSAT",
        value: "4.7/5",
        delta: "+0.2",
        icon: CheckCircle2,
        color: "text-amber-400",
    },
];

// Chart Data (30 days trend)
const data = Array.from({ length: 30 }, (_, i) => {
    const base = 300;
    const day = i + 1;
    // Add some realistic variance: higher on weekdays, lower on weekends
    const isWeekend = (day % 7) === 0 || (day % 7) === 6;
    const variance = isWeekend ? -50 : 100;
    const random = Math.floor(Math.random() * 50);
    // Upward trend
    const trend = i * 5;

    return {
        day: `Día ${day}`,
        tickets: base + variance + random + trend,
    };
});

// Recent Events Data
const events = [
    { text: "WhatsApp — cita agendada", time: "2 min", type: "success" },
    { text: "Email — respuesta enviada", time: "14 min", type: "info" },
    { text: "Handoff — escalado a humano", time: "32 min", type: "warning" },
];

export const KPIDashboard = () => {
    return (
        <div className="w-full h-full flex flex-col p-6 bg-[#0B0D12] text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                        Insights operativos
                        <span className="px-2 py-0.5 rounded-full bg-brand-blue-primary/10 text-brand-blue-primary text-[10px] font-mono font-medium tracking-wide">
                            LIVE
                        </span>
                    </h3>
                    <p className="text-xs text-brand-gray-500 font-medium mt-1">
                        Agentes RespondAi
                    </p>
                </div>
                <div className="text-xs font-medium text-brand-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    Últimos 30 días
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col justify-between hover:bg-white/[0.04] transition-colors"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <stat.icon className={cn("w-4 h-4", stat.color)} />
                            <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white/5", stat.color)}>
                                {stat.delta}
                            </span>
                        </div>
                        <div>
                            <div className="text-2xl font-bold tracking-tight text-white">
                                {stat.value}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-brand-gray-500 font-medium mt-1">
                                {stat.label}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Chart */}
            <div className="flex-1 min-h-0 bg-white/[0.02] border border-white/5 rounded-xl p-4 relative overflow-hidden group">
                <div className="absolute top-4 left-4 z-10">
                    <h4 className="text-xs font-semibold text-brand-gray-400 uppercase tracking-wider">
                        Tickets Resueltos
                    </h4>
                </div>

                <div className="w-full h-full pt-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                            <XAxis
                                dataKey="day"
                                hide
                            />
                            <YAxis
                                hide
                                domain={['dataMin - 50', 'dataMax + 50']}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-[#0B0D12] border border-white/10 rounded-lg p-2 shadow-xl">
                                                <p className="text-xs text-brand-gray-400 mb-1">{payload[0].payload.day}</p>
                                                <p className="text-sm font-bold text-white">
                                                    {payload[0].value} <span className="text-brand-gray-500 font-normal text-xs">tickets</span>
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="tickets"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorTickets)"
                                isAnimationActive={true}
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Events (Mini Footer) */}
            <div className="mt-4 flex gap-4 overflow-hidden mask-gradient-x">
                {events.map((event, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-brand-gray-500 whitespace-nowrap">
                        <div className={cn("w-1.5 h-1.5 rounded-full",
                            event.type === 'success' ? 'bg-emerald-500' :
                                event.type === 'info' ? 'bg-blue-500' : 'bg-amber-500'
                        )} />
                        {event.text}
                        <span className="opacity-50">· {event.time}</span>
                    </div>
                ))}
                <div className="flex items-center gap-2 text-[10px] text-brand-gray-500 whitespace-nowrap">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    CRM — lead calificado
                    <span className="opacity-50">· 1h</span>
                </div>
            </div>
        </div>
    );
};
