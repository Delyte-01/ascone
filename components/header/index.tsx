"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Accounts", href: "#accounts" },
  { label: "Company", href: "#company" },
  { label: "Insight", href: "#insight" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-[#2A2A2E]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              onClick={() => setMenuOpen(false)}
            >
              {/* Logo mark */}
              <div className="w-7 h-7 rounded-md bg-[#C9A84C] flex items-center justify-center shadow-[0_0_12px_#C9A84C50]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12 L7 2 L12 12"
                    stroke="#0A0A0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 8.5h6"
                    stroke="#0A0A0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-serif text-xl text-[#F0EDE8] tracking-tight group-hover:text-[#C9A84C] transition-colors duration-200">
                Ascone
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-sans text-[#9E9B95] hover:text-[#F0EDE8] transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                className="font-sans text-sm text-[#9E9B95] hover:text-[#F0EDE8] hover:bg-transparent px-4"
              >
                Login
              </Button>
              <Button className="font-sans text-sm font-medium bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0A0A0B] rounded-full px-6 py-2 transition-all duration-300 shadow-[0_0_20px_#C9A84C30] hover:shadow-[0_0_28px_#C9A84C50]">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#2A2A2E] text-[#9E9B95] hover:text-[#F0EDE8] hover:border-[#C9A84C]/40 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {!menuOpen &&  (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#111113] border-l border-[#2A2A2E] flex flex-col transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#2A2A2E]">
            <span className="font-serif text-lg text-[#F0EDE8]">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2A2A2E] text-[#9E9B95] hover:text-[#F0EDE8] hover:border-[#C9A84C]/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer links */}
          <div className="flex flex-col px-4 py-6 gap-1 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-4 rounded-xl text-[#9E9B95] hover:text-[#F0EDE8] hover:bg-[#1A1A1E] transition-all duration-200 group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="font-sans text-base">{link.label}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-[#5A5855] group-hover:text-[#C9A84C] transition-colors"
                >
                  <path
                    d="M2 7h10M7 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>

          {/* Drawer footer CTAs */}
          <div className="px-4 pb-8 space-y-3 border-t border-[#2A2A2E] pt-6">
            <Button
              variant="ghost"
              className="w-full font-sans text-sm text-[#9E9B95] hover:text-[#F0EDE8] hover:bg-[#1A1A1E] border border-[#2A2A2E] rounded-xl py-5"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Button>
            <Button
              className="w-full font-sans text-sm font-medium bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0A0A0B] rounded-xl py-5 shadow-[0_0_20px_#C9A84C30]"
              onClick={() => setMenuOpen(false)}
            >
              Get Started — Free
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
