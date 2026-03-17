
import { AboutSection } from "@/features/landing-page/about-section";
import { FaqSection } from "@/features/landing-page/faq";
import { HeroSection } from "@/features/landing-page/hero";
import { NumbersSection } from "@/features/landing-page/nmbers-section";
import { ValuesSection } from "@/features/landing-page/value-section";


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
     
      <HeroSection />
      <AboutSection />
      <NumbersSection />
      <ValuesSection />
      <FaqSection />
    </main>
  );
}
