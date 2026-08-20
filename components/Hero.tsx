"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import {
  ArrowRight,
  Info,
  ShieldCheck,
  GraduationCap,
  Users,
  TrendingUp,
  UserCheck,
} from "lucide-react";

interface HeroProps {
  onOpenEnroll: (plan?: string) => void;
}

const heroSlides = [
  {
    src: "/hero/hero-teacher.webp",
    alt: "OTOTeachers — ভেরিফাইড শিক্ষক অনলাইনে পাঠদান করছেন",
    titleBn: "নিজের শিক্ষকের সাথে শুরু করুন ব্যক্তিগত লাইভ ক্লাস",
    titleEn: "Start Your Personal Live Classes with Selected Tutors Today",
    badgeBn: "ভেরিফাইড ব্যক্তিগত শিক্ষক",
    badgeEn: "1-on-1 Verified Teacher",
  },
  {
    src: "/hero/hero-student-boy.webp",
    alt: "OTOTeachers — অনলাইনে ১-অন-১ পড়ালেখা ও প্রবলেম সলভিং",
    titleBn: "পছন্দের সময়ে ঘরে বসেই সরাসরি শিক্ষকের কাছে পড়া",
    titleEn: "Study from Home with Personal Tutors at Your Preferred Time",
    badgeBn: "লাইভ ইন্টারঅ্যাক্টিভ ক্লাস",
    badgeEn: "Live Interactive Class",
  },
  {
    src: "/hero/hero-student-girl.webp",
    alt: "OTOTeachers — আত্মবিশ্বাসের সাথে অ্যাকাডেমিক সাফল্য",
    titleBn: "দ্বিধাহীন প্রশ্ন করার পূর্ণ স্বাধীনতা ও সেরা প্রস্তুতি",
    titleEn: "Full Freedom to Ask Questions & Build Academic Confidence",
    badgeBn: "১০০% একক মনোযোগ",
    badgeEn: "100% Individual Attention",
  },
];

export default function Hero({ onOpenEnroll }: HeroProps) {
  const { t, lang } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto transition every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero relative bg-[#F4F9F9] text-[#0D2C4A] pt-8 sm:pt-14 pb-12 sm:pb-20 font-sans border-b border-[#00A896]/15">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Text Column */}
        <div className="order-2 lg:order-1 lg:col-span-6 space-y-4 sm:space-y-5">
          {/* SEO Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A896]/10 text-[#00A896] text-xs font-mono font-bold tracking-wide border border-[#00A896]/20">
            <ShieldCheck className="w-4 h-4 text-[#00A896]" />
            <span>{t.heroBadge || "OTOTeachers — একজন শিক্ষার্থী, একজন শিক্ষক"}</span>
          </div>

          {/* Primary SEO H1 Heading */}
          <h1 className="font-sans text-xl sm:text-3xl md:text-[36px] lg:text-[42px] font-extrabold text-[#0D2C4A] tracking-tight leading-[1.25] mb-3 sm:mb-4">
            {lang === "bn" ? (
              <>
                <span className="block whitespace-nowrap">একজন শিক্ষার্থী, একজন শিক্ষক —</span>
                <span className="text-[#00A896] block whitespace-nowrap">সাশ্রয়ী অনলাইন শিক্ষক</span>
              </>
            ) : (
              <>
                <span className="block whitespace-nowrap">Affordable One-to-One</span>
                <span className="text-[#00A896] block whitespace-nowrap">Online Teachers in Bangladesh</span>
              </>
            )}
          </h1>

          {/* Supporting Brand Message */}
          <p className="text-base sm:text-lg font-bold text-[#008075] leading-snug mb-3 text-justify">
            {lang === "bn"
              ? "নিজের শিক্ষকের সাথে ব্যক্তিগতভাবে শিখুন, নিজের গতিতে এগিয়ে যান।"
              : "Learn individually with your personal tutor, progress at your own pace."}
          </p>

          {/* Subtitle / Paragraph */}
          <p className="text-sm sm:text-base leading-relaxed text-[#475569] max-w-[580px] font-normal mb-5 sm:mb-6 text-justify">
            {t.heroLede}
          </p>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
            <button
              type="button"
              onClick={() => onOpenEnroll?.("Student Request")}
              className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#00A896] text-white font-bold text-sm hover:bg-[#008075] shadow-lg shadow-[#00A896]/30 hover:-translate-y-0.5 transition-all cursor-pointer select-none w-full sm:w-auto"
            >
              <span>{t.heroFindMentor}</span>
              <ArrowRight className="w-4.5 h-4.5 text-white" />
            </button>

            <Link
              href="/about"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#E6F4F3] text-[#0D2C4A] font-bold text-sm hover:bg-[#D4ECE9] transition-colors cursor-pointer border border-[#00A896]/15 select-none w-full sm:w-auto text-center"
            >
              <span>{lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}</span>
              <Info className="w-4.5 h-4.5 text-[#0D2C4A]" />
            </Link>
          </div>

          <hr className="border-t border-[#0D2C4A]/10 my-4 sm:my-6" />

          {/* 3 Stat Cards at bottom - Clean grid on mobile & desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-lg font-extrabold text-[#00A896] leading-tight">
                  4,200+
                </strong>
                <span className="text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  {t.heroStatStudents}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <Users className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-lg font-extrabold text-[#00A896] leading-tight">
                  860+
                </strong>
                <span className="text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  {t.heroStatMentors}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-lg font-extrabold text-[#00A896] leading-tight">
                  92%
                </strong>
                <span className="text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  {t.heroStatImprovement}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Feature Cards Column - Larger image showcase */}
        <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col gap-4 sm:gap-5">
          {/* Main Classroom Image Card with Smooth Fade In/Out Transitions */}
          <div
            onClick={() => onOpenEnroll?.("Student Request")}
            className="relative rounded-3xl overflow-hidden shadow-xl border border-[#00A896]/20 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] group bg-[#0D2C4A] p-2.5 cursor-pointer hover:shadow-2xl transition-all"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0D2C4A]">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    idx === currentSlide
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-105 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C4A]/90 via-[#0D2C4A]/30 to-transparent pointer-events-none" />
                </div>
              ))}

              {/* Dynamic Badge */}
              <div className="absolute top-4 left-4 z-20 bg-[#02554d]/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md max-w-[70%]">
                <ShieldCheck className="w-4 h-4 text-white flex-shrink-0" />
                <span className="truncate">
                  {lang === "bn" ? heroSlides[currentSlide].badgeBn : heroSlides[currentSlide].badgeEn}
                </span>
              </div>

              {/* Slide Navigation Dots */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full">
                {heroSlides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(dotIdx);
                    }}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      dotIdx === currentSlide
                        ? "w-5 bg-[#00A896]"
                        : "w-2 bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Dynamic Text on Image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-20 text-white space-y-1">
                <p className="font-sans text-base sm:text-lg font-bold leading-[1.35] text-white drop-shadow-md transition-all duration-500">
                  {lang === "bn"
                    ? heroSlides[currentSlide].titleBn
                    : heroSlides[currentSlide].titleEn}
                </p>
              </div>
            </div>
          </div>

          {/* Free Trial Banner Box - Fully responsive flex layout */}
          <div className="bg-[#E6F4F3] border border-[#00A896]/25 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#B8E6E2] text-[#00A896] flex items-center justify-center font-bold flex-shrink-0 shadow-inner">
                <UserCheck className="w-5.5 h-5.5 text-[#00A896]" />
              </div>
              <div>
                <strong className="block font-sans text-sm font-extrabold text-[#0D2C4A] leading-snug">
                  {t.heroTrialTitle}
                </strong>
                <span className="text-xs text-[#64748B] font-medium block pt-0.5">
                  {t.heroTrialSub}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenEnroll?.("Free Trial")}
              className="w-full sm:w-auto text-center justify-center px-6 py-3 sm:py-2.5 rounded-full bg-[#00A896] text-white font-extrabold text-xs hover:bg-[#008075] transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              {t.heroBookTrial}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
