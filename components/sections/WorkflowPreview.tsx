"use client";

import { motion } from "framer-motion";
import {
    MessageCircle,
    Sparkles,
    Database,
    Mail,
    FileSpreadsheet,
    MoreHorizontal,
    Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

// --- Node Component ---

interface WorkflowNodeProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    color?: string; // Icon background color
    className?: string;
    isTrigger?: boolean;
}

const WorkflowNode = ({ icon, title, subtitle, color = "bg-brand-blue-primary", className, isTrigger }: WorkflowNodeProps) => {
    return (
        <div className={cn(
            "relative group flex items-center gap-3 p-3 min-w-[200px] bg-white rounded-xl border border-slate-200 shadow-[0_2px_8px_rgb(15,23,42,0.08)] transition-all hover:shadow-[0_4px_12px_rgb(15,23,42,0.12)] z-10",
            className
        )}>
            {/* Input Handle (Left) - Not for trigger */}
            {!isTrigger && (
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-slate-400 rounded-full z-20 group-hover:border-brand-blue-primary transition-colors" />
            )}

            {/* Icon */}
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0", color)}>
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-700 truncate">{title}</div>
                {subtitle && <div className="text-[10px] text-slate-400 font-medium truncate">{subtitle}</div>}
            </div>

            {/* Menu options */}
            <div className="text-slate-300 hover:text-slate-500 cursor-pointer">
                <MoreHorizontal className="w-4 h-4" />
            </div>

            {/* Output Handle (Right) */}
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-slate-400 rounded-full z-20 group-hover:border-brand-blue-primary transition-colors flex items-center justify-center">
                <div className="w-1 h-1 bg-transparent group-hover:bg-brand-blue-primary rounded-full transition-colors" />
            </div>

            {/* Decorative Plus Button on Hover (n8n style) */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-slate-400 hover:text-brand-blue-primary hover:border-brand-blue-primary z-30 transform scale-75 group-hover:scale-100 duration-200">
                <Plus className="w-3 h-3" />
            </div>
        </div>
    );
};

// --- Connection Line Component ---
// Simple SVG bezier curve
const ConnectionLine = ({ startX, startY, endX, endY }: { startX: number, startY: number, endX: number, endY: number }) => {
    // Calculate control points for a smooth bezier curve
    const dist = Math.abs(endX - startX);
    const cp1x = startX + dist * 0.5;
    const cp1y = startY;
    const cp2x = endX - dist * 0.5;
    const cp2y = endY;

    const path = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <path
                d={path}
                stroke="#CBD5E1" // Slate-300
                strokeWidth="2"
                fill="none"
                className="animate-[draw_1s_ease-out_forwards]"
            />
        </svg>
    );
};

export const WorkflowPreview = () => {
    // We'll use a fixed layout for simplicity in this demo to ensure perfect alignment
    // Responsive: In mobile, we just stack them vertically. In desktop, we use absolute/grid positioning.

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden bg-[#F8FAFC] relative font-sans">
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.08) 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Container for the specific flow - justify-start + mx-auto on child = safe center */}
            <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8 overflow-auto">

                {/* Desktop View: Absolute Layout for Precision */}
                <div className="hidden md:block relative w-[850px] h-[450px] shrink-0 mx-auto">

                    {/* SVG Connector Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        {/* WhatsApp (240, 225) -> Agent (304, 225) */}
                        <path
                            d="M 240,225 C 272,225 272,225 304,225"
                            fill="none"
                            stroke="rgba(15,23,42,0.25)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        {/* Agent (544, 225) -> Database Top (608, 135) */}
                        <path
                            d="M 544,225 C 576,225 576,135 608,135"
                            fill="none"
                            stroke="rgba(15,23,42,0.25)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        {/* Agent (544, 225) -> Gmail Mid (608, 225) */}
                        <path
                            d="M 544,225 L 608,225"
                            fill="none"
                            stroke="rgba(15,23,42,0.25)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        {/* Agent (544, 225) -> Sheets Bottom (608, 315) */}
                        <path
                            d="M 544,225 C 576,225 576,315 608,315"
                            fill="none"
                            stroke="rgba(15,23,42,0.25)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* 1. Trigger Node - absolute left-0 */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[240px] z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <WorkflowNode
                                isTrigger
                                icon={<MessageCircle className="w-5 h-5" />}
                                title="WhatsApp Msg"
                                subtitle="New message received"
                                color="bg-green-500"
                            />
                        </motion.div>
                        {/* Tag */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider rounded-md border border-slate-200 z-50">
                            Trigger
                        </div>
                    </div>

                    {/* 2. Agent Node - absolute left-304 */}
                    <div className="absolute left-[304px] top-1/2 -translate-y-1/2 w-[240px] z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <WorkflowNode
                                icon={<Sparkles className="w-5 h-5" />}
                                title="AI Agent"
                                subtitle="Classify & Extract Data"
                                color="bg-purple-600"
                            />
                        </motion.div>
                    </div>

                    {/* 3. Branching Nodes - absolute left-608 */}

                    {/* Database (Top) */}
                    <div className="absolute left-[608px] top-1/2 -translate-y-[calc(50%+90px)] w-[240px] z-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <WorkflowNode
                                icon={<Database className="w-5 h-5" />}
                                title="Database"
                                subtitle="Store lead / event"
                                color="bg-blue-500"
                            />
                        </motion.div>
                    </div>

                    {/* Gmail (Mid) */}
                    <div className="absolute left-[608px] top-1/2 -translate-y-1/2 w-[240px] z-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <WorkflowNode
                                icon={<Mail className="w-5 h-5" />}
                                title="Gmail"
                                subtitle="Send confirmation"
                                color="bg-red-500"
                            />
                        </motion.div>
                    </div>

                    {/* Sheets (Bottom) */}
                    <div className="absolute left-[608px] top-1/2 -translate-y-[calc(50%-90px)] w-[240px] z-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <WorkflowNode
                                icon={<FileSpreadsheet className="w-5 h-5" />}
                                title="Google Sheets"
                                subtitle="Log in CRM"
                                color="bg-green-600"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Mobile View: Vertical Stack */}
                <div className="md:hidden flex flex-col items-center gap-8 w-full py-8">
                    {/* 1. Trigger Node */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-[280px] relative"
                    >
                        <WorkflowNode
                            isTrigger
                            icon={<MessageCircle className="w-5 h-5" />}
                            title="WhatsApp Msg"
                            subtitle="New message received"
                            color="bg-green-500"
                            className="w-full"
                        />
                        {/* Downward line */}
                        <div className="absolute left-1/2 -bottom-8 w-[2px] h-8 bg-slate-300 -translate-x-1/2 -z-10" />
                    </motion.div>

                    {/* 2. Agent Node */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-[280px] relative"
                    >
                        <WorkflowNode
                            icon={<Sparkles className="w-5 h-5" />}
                            title="AI Agent"
                            subtitle="Classify & Extract Data"
                            color="bg-purple-600"
                            className="w-full"
                        />
                        {/* Downward line from agent */}
                        <div className="absolute left-1/2 -bottom-8 w-[2px] h-8 bg-slate-300 -translate-x-1/2 -z-10" />
                    </motion.div>

                    {/* 3. Branching Nodes Container */}
                    <div className="w-full max-w-[280px] flex flex-col gap-4 relative">
                        {/* Branching connections for mobile (simple visual) */}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <WorkflowNode
                                icon={<Database className="w-5 h-5" />}
                                title="Database"
                                subtitle="Store lead / event"
                                color="bg-blue-500"
                                className="w-full"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <WorkflowNode
                                icon={<Mail className="w-5 h-5" />}
                                title="Gmail"
                                subtitle="Send confirmation"
                                color="bg-red-500"
                                className="w-full"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <WorkflowNode
                                icon={<FileSpreadsheet className="w-5 h-5" />}
                                title="Google Sheets"
                                subtitle="Log in CRM"
                                color="bg-green-600"
                                className="w-full"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Overlay Gradient for "Protected" feel (optional) */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(15,23,42,0.05)]" />
        </div>
    );
};
