"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import {
  PhoneCall,
  Search,
  Globe,
  Menu,
  X,
  ArrowRight,
  Home,
  BookOpen,
  CreditCard,
  Phone,
  UserCheck,
} from "lucide-react";

interface NavbarProps {
  onOpenEnroll: () => void;
  onOpenMentor: () => void;
}

export default function Navbar({ onOpenEnroll, onOpenMentor }: NavbarProps) {
  const { lang, t, toggleLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 shadow-md border-b border-[#00A896]/20 bg-[#FFFFFF] font-sans">
      {/* ===== TOP ANNOUNCEMENT BAR ===== */}
      <div className="bg-[#0D2C4A] text-[#F8FAFC] py-2 px-4 sm:px-8 border-b border-[#00A896]/20">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4">
            <a
              href="tel:09610883388"
              className="flex items-center gap-1.5 hover:text-[#00A896] transition-colors font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#00A896]" />
              <span>{t.topbarPhone}</span>
            </a>
            <span className="hidden lg:inline text-white/30">|</span>
            <span className="hidden lg:inline text-white/80 font-medium">
              {lang === "bn"
                ? "বাংলাদেশ জুড়ে ১-অন-১ অনলাইন মেন্টরশিপ"
                : "Online 1-on-1 Mentorship Across Bangladesh"}
            </span>
          </div>

          <div className="hidden md:flex items-center bg-[#16385C] rounded-full px-3.5 py-1 w-64 lg:w-80 border border-white/10">
            <Search className="w-3.5 h-3.5 text-[#00A896] mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder={t.topbarSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs text-[#F8FAFC] placeholder-[#F8FAFC]/50"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 bg-[#00A896] text-[#FFFFFF] px-3.5 py-1 rounded-full text-xs font-bold hover:bg-[#008075] transition-colors shadow-sm"
              title="Change Language / ভাষা পরিবর্তন"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "English" : "বাংলা"}</span>
            </button>

            <button
              onClick={onOpenEnroll}
              className="hidden sm:inline-flex items-center gap-1 bg-white/15 text-white border border-white/20 px-4 py-1 rounded-full text-xs font-semibold hover:bg-white/25 transition-colors"
            >
              <span>{t.topbarFreeTrial}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="flex items-center justify-between py-4 px-6 md:px-8 max-w-[1240px] mx-auto bg-[#FFFFFF]">
        {/* Brand Logo */}
        <Link href="/" className="brand flex items-center gap-3 group">
          <img
            src="/Assets/Group 2147229264.png"
            alt="OTOTeacher Logo"
            style={{ height: "50px", width: "auto", maxHeight: "50px" }}
            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Links (Home, Bisoy bittik teacher -> /subjects page, Pricing plan, Contact us) */}
        <div className="navlinks hidden lg:flex items-center gap-8 xl:gap-10 text-sm sm:text-base font-extrabold text-[#0D2C4A]">
          <Link href="/" className="hover:text-[#00A896] transition-colors flex items-center gap-2 py-1">
            <Home className="w-4.5 h-4.5 text-[#00A896]" />
            <span>{t.navHome}</span>
          </Link>

          {/* Bisoy bittik teacher -> Links to dedicated /subjects Page */}
          <Link href="/subjects" className="hover:text-[#00A896] transition-colors flex items-center gap-2 py-1">
            <BookOpen className="w-4.5 h-4.5 text-[#00A896]" />
            <span>{t.navSubjects}</span>
          </Link>

          <a href="/#pricing" className="hover:text-[#00A896] transition-colors flex items-center gap-2 py-1">
            <CreditCard className="w-4.5 h-4.5 text-[#00A896]" />
            <span>{t.navPricingPlan}</span>
          </a>

          <a href="/#contact" className="hover:text-[#00A896] transition-colors flex items-center gap-2 py-1">
            <Phone className="w-4.5 h-4.5 text-[#00A896]" />
            <span>{t.navContactUs}</span>
          </a>
        </div>

        {/* Right Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenEnroll}
            className="btn flex items-center gap-2 text-sm font-extrabold px-6 py-3 rounded-full bg-[#00A896] text-white hover:bg-[#008075] shadow-lg shadow-[#00A896]/25 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>{t.btnStartLearning}</span>
            <UserCheck className="w-4.5 h-4.5 text-white" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-[#0D2C4A] hover:bg-[#0D2C4A]/5 transition-colors border border-[#0D2C4A]/10"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#0D2C4A]/10 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 font-extrabold text-base text-[#0D2C4A]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-[#0D2C4A]/5 flex items-center gap-2.5">
              <Home className="w-5 h-5 text-[#00A896]" />
              <span>{t.navHome}</span>
            </Link>

            <Link href="/subjects" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-[#0D2C4A]/5 flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-[#00A896]" />
              <span>{t.navSubjects}</span>
            </Link>

            <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="py-2.5 border-b border-[#0D2C4A]/5 flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-[#00A896]" />
              <span>{t.navPricingPlan}</span>
            </a>

            <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="py-2.5 flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-[#00A896]" />
              <span>{t.navContactUs}</span>
            </a>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnroll();
              }}
              className="w-full flex items-center justify-center gap-2 font-extrabold px-6 py-3.5 rounded-full bg-[#00A896] text-white text-base shadow-md"
            >
              <span>{t.btnStartLearning}</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMentor();
              }}
              className="w-full flex items-center justify-center gap-2 font-extrabold px-6 py-3.5 rounded-full border-1.5 border-[#0D2C4A]/25 text-[#0D2C4A] text-base"
            >
              <UserCheck className="w-5 h-5 text-[#00A896]" />
              <span>{t.btnBecomeMentor}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
