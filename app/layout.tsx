import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MontserratAI | Automatización IA para Atención al Cliente",
  description: "Automatiza procesos repetitivos, reduce tiempos de espera y aumenta ventas con MontserratAI. La solución de IA para soporte al cliente moderno.",
  openGraph: {
    title: "MontserratAI | Automatización IA",
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
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} bg-brand-black text-foreground antialiased selection:bg-brand-blue-primary/30 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
