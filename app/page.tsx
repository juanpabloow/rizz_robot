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
      <main className="flex-grow">
        <Hero />
        <Services />
        <DemoSection />
        <Methodology />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
