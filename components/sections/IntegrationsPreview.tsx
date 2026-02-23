"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    WhatsAppLogo,
    GmailLogo,
    InstagramLogo,
    MicrosoftTeamsLogo,
    SlackLogo,
    SupabaseLogo,
    MessengerLogo,
    OutlookLogo,
    FirebaseLogo,
    SnowflakeLogo,
    HubSpotLogo,
    SalesforceLogo,
} from "@/components/ui/BrandLogos";

const logos = [
    { component: WhatsAppLogo, name: "WhatsApp" },
    { component: GmailLogo, name: "Gmail" },
    { component: InstagramLogo, name: "Instagram" },
    { component: MicrosoftTeamsLogo, name: "Microsoft Teams" },
    { component: SlackLogo, name: "Slack" },
    { component: SupabaseLogo, name: "Supabase" },
    { component: MessengerLogo, name: "Messenger" },
    { component: OutlookLogo, name: "Outlook" },
    { component: FirebaseLogo, name: "Firebase" },
    { component: SnowflakeLogo, name: "Snowflake" },
    { component: HubSpotLogo, name: "HubSpot" },
    { component: SalesforceLogo, name: "Salesforce" },
];

export const IntegrationsPreview = () => {
    // Duplicate logos to ensure seamless loop (3 sets should be enough for most screen widths)
    const seamlessLogos = [...logos, ...logos, ...logos];

    return (
        <div className="w-full h-full bg-[#0B0D12] text-white overflow-hidden flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue-primary/5 via-transparent to-transparent opacity-40" />

            <div className="relative w-full max-w-full overflow-hidden py-10">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0B0D12] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0B0D12] to-transparent z-10" />

                {/* Marquee Track */}
                <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
                    {seamlessLogos.map((Logo, idx) => (
                        <div
                            key={`${Logo.name}-${idx}`}
                            className="flex flex-col items-center justify-center mx-6 sm:mx-8 group transition-all duration-300 transform hover:scale-110"
                            title={Logo.name}
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 shadow-sm backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                                <Logo.component className="w-7 h-7 sm:w-8 sm:h-8 opacity-90 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}

                    {/* "Y más" indicator */}
                    <div className="flex flex-col items-center justify-center mx-6 sm:mx-8">
                        <span className="text-brand-gray-500 font-medium text-xs sm:text-sm tracking-widest uppercase">
                            Y más
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center px-6">
                <p className="text-brand-gray-400 text-xs sm:text-sm font-medium tracking-wide">
                    Conectamos con <span className="text-brand-blue-primary">tu stack actual</span> sin complicaciones.
                </p>
            </div>
        </div>
    );
};
