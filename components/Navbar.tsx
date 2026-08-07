"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { Menu, X, PhoneCall, Globe, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenEnroll?: () => void;
  onOpenMentor?: () => void;
}

export default function Navbar({ onOpenEnroll, onOpenMentor }: NavbarProps) {
  const { lang, t, toggleLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  const getDesktopLinkClass = (path: string) => {
    const active = isLinkActive(path);
    return `relative py-1.5 transition-all duration-200 font-extrabold text-sm sm:text-base cursor-pointer select-none ${
      active
        ? "text-[#00A896] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#00A896] after:rounded-full"
        : "text-[#0D2C4A] hover:text-[#00A896] active:text-[#008075] active:scale-95 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[2px] hover:after:bg-[#00A896]/40 hover:after:rounded-full"
    }`;
  };

  const getMobileLinkClass = (path: string) => {
    const active = isLinkActive(path);
    return `py-3 px-3 rounded-xl transition-all font-extrabold text-base border-b border-[#0D2C4A]/5 ${
      active
        ? "bg-[#00A896]/10 text-[#00A896] border-l-4 border-l-[#00A896]"
        : "text-[#0D2C4A] hover:bg-gray-50 hover:text-[#00A896] active:bg-[#00A896]/15"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 shadow-md border-b border-[#00A896]/20 bg-[#FFFFFF] font-sans">
      {/* ===== TOP ANNOUNCEMENT BAR ===== */}
      <div className="bg-[#0D2C4A] text-[#F8FAFC] py-2.5 px-4 sm:px-8 border-b border-[#00A896]/20">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4 text-sm font-sans">
          <div className="flex items-center gap-4">
            <a
              href="tel:01775551325"
              className="flex items-center gap-2 hover:text-[#00A896] active:text-[#38BDF8] transition-colors font-bold text-sm sm:text-base"
            >
              <PhoneCall className="w-4 h-4 text-[#00A896]" />
              <span>{t.topbarPhone}</span>
            </a>
            <span className="hidden lg:inline text-white/30 font-light">|</span>
            <span className="hidden lg:inline text-white/90 font-semibold text-sm sm:text-[15px]">
              {lang === "bn"
                ? "বাংলাদেশ জুড়ে ১-অন-১ অনলাইন মেন্টরশিপ"
                : "Online 1-on-1 Mentorship Across Bangladesh"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleLang();
              }}
              className="flex items-center gap-1.5 bg-[#00A896] text-[#FFFFFF] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold hover:bg-[#008075] active:bg-[#00665E] active:scale-95 transition-all shadow-sm cursor-pointer select-none"
              title="Change Language / ভাষা পরিবর্তন"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === "bn" ? "English" : "বাংলা"}</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenEnroll?.()}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#FFB627] text-[#0D2C4A] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold hover:bg-[#FFA800] active:scale-95 transition-all shadow-md cursor-pointer select-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0D2C4A]" />
              <span>{t.topbarFreeTrial}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="flex items-center justify-between py-3.5 px-6 md:px-8 max-w-[1240px] mx-auto bg-[#FFFFFF]">
        {/* Brand Logo */}
        <Link href="/" className="brand flex items-center gap-3 group">
          <img
            src="/Assets/Group 2147229264.png"
            alt="OTOTeacher Logo"
            style={{ height: "50px", width: "auto", maxHeight: "50px" }}
            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navlinks hidden lg:flex items-center gap-6 xl:gap-8">
          <Link href="/" className={getDesktopLinkClass("/")}>
            <span>{t.navHome}</span>
          </Link>

          <Link href="/about" className={getDesktopLinkClass("/about")}>
            <span>{lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}</span>
          </Link>

          <Link href="/subjects" className={getDesktopLinkClass("/subjects")}>
            <span>{t.navSubjects}</span>
          </Link>

          <Link href="/blogs" className={getDesktopLinkClass("/blogs")}>
            <span>{t.navBlogs || "ব্লগ"}</span>
          </Link>

          <a href="/#pricing" className={getDesktopLinkClass("/#pricing")}>
            <span>{t.navPricingPlan}</span>
          </a>

          <Link href="/contact" className={getDesktopLinkClass("/contact")}>
            <span>{t.navContactUs}</span>
          </Link>
        </div>

        {/* Right Action Button with active & hover state */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenEnroll?.()}
            className="btn text-sm font-extrabold px-6 py-3 rounded-full bg-[#00A896] text-white hover:bg-[#008075] active:bg-[#00665E] active:scale-95 shadow-lg shadow-[#00A896]/25 hover:-translate-y-0.5 transition-all cursor-pointer select-none"
          >
            <span>{t.btnStartLearning}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-[#0D2C4A] hover:bg-[#0D2C4A]/5 active:bg-[#0D2C4A]/10 active:scale-95 transition-colors border border-[#0D2C4A]/10 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer (Icons removed, active and hover states added) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#0D2C4A]/10 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClass("/")}
            >
              <span>{t.navHome}</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClass("/about")}
            >
              <span>{lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}</span>
            </Link>

            <Link
              href="/subjects"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClass("/subjects")}
            >
              <span>{t.navSubjects}</span>
            </Link>

            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClass("/blogs")}
            >
              <span>{t.navBlogs || "ব্লগ"}</span>
            </Link>

            <a
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClass("/#pricing")}
            >
              <span>{t.navPricingPlan}</span>
            </a>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClass("/contact")}
            >
              <span>{t.navContactUs}</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnroll?.();
              }}
              className="w-full font-extrabold px-6 py-3.5 rounded-full bg-[#00A896] text-white text-base shadow-md hover:bg-[#008075] active:bg-[#00665E] active:scale-98 transition-all cursor-pointer"
            >
              <span>{t.btnStartLearning}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMentor?.();
              }}
              className="w-full font-extrabold px-6 py-3.5 rounded-full border-1.5 border-[#0D2C4A]/25 text-[#0D2C4A] text-base hover:bg-gray-50 active:bg-gray-100 active:scale-98 transition-all cursor-pointer"
            >
              <span>{t.btnBecomeMentor}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
