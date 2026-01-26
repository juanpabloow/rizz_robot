import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

export const metadata: Metadata = {
  title: "RespondAi | Automatización IA para Atención al Cliente",
  description: "Automatiza procesos repetitivos, reduce tiempos de espera y aumenta ventas con RespondAi. La solución de IA para soporte al cliente moderno.",
  openGraph: {
    title: "RespondAi | Automatización IA",
    description: "Transforma tu atención al cliente con Inteligencia Artificial. Rápido, preciso y 24/7.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-brand-black text-foreground antialiased selection:bg-brand-blue-primary/30 min-h-screen`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
