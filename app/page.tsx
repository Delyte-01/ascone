"use client"

import { PageLoader } from "@/components/page-loader";
// import { PageLoader } from "@/components/page-loader";
import { AboutSection } from "@/features/landing-page/about-section";
import { FaqSection } from "@/features/landing-page/faq";
import { HeroSection } from "@/features/landing-page/hero";
import { NumbersSection } from "@/features/landing-page/numbers-section";

import { ValuesSection } from "@/features/landing-page/value-section";



export default function Home() {
 

  return (
    <PageLoader>
        <HeroSection />
        <AboutSection />
        <NumbersSection />
        <ValuesSection />
        <FaqSection />
     </PageLoader>
  );
}
