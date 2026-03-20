import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import SmoothScrolling from "@/components/smooth-scroll";


export const metadata: Metadata = {
  title: "ASCONE",
  description: "Digital Experiences That Feel Like Luxury.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          <Navigation />

          {children}
          <Footer />
          <BackToTop />
        </SmoothScrolling>
      </body>
    </html>
  );
}
