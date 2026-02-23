import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { DemoSection } from "@/components/sections/DemoSection";
import { Benefits } from "@/components/sections/Benefits";
import { CTA } from "@/components/sections/CTA";
import { Methodology } from "@/components/sections/Methodology";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Hero />
        <div className="relative">
          {/* Subtle background tech lines to reinforce engineering aesthetic across page */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: `4rem 4rem`
            }}
          />
          <div className="relative z-10">
            <Services />
            <DemoSection />
            <Methodology />
            <Benefits />
            <CTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
