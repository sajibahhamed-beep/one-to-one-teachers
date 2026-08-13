"use client";

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

export default function Hero({ onOpenEnroll }: HeroProps) {
  const { t, lang } = useLanguage();

  return (
    <section className="hero relative bg-[#F4F9F9] text-[#0D2C4A] pt-8 sm:pt-14 pb-12 sm:pb-20 font-sans border-b border-[#00A896]/15">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Text Column */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          {/* SEO Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A896]/10 text-[#00A896] text-xs font-mono font-bold tracking-wide border border-[#00A896]/20">
            <ShieldCheck className="w-4 h-4 text-[#00A896]" />
            <span>{t.heroBadge || "OTOTeachers — একজন শিক্ষার্থী, একজন শিক্ষক"}</span>
          </div>

          {/* Primary SEO H1 Heading */}
          <h1 className="font-sans text-xl sm:text-3xl md:text-[38px] lg:text-[46px] font-extrabold text-[#0D2C4A] tracking-tight leading-[1.25] mb-3 sm:mb-4">
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
          <p className="text-base sm:text-xl font-bold text-[#008075] leading-snug mb-3 text-justify">
            {lang === "bn"
              ? "নিজের শিক্ষকের সাথে ব্যক্তিগতভাবে শিখুন, নিজের গতিতে এগিয়ে যান।"
              : "Learn individually with your personal tutor, progress at your own pace."}
          </p>

          {/* Subtitle / Paragraph */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#475569] max-w-[620px] font-normal mb-6 sm:mb-8 text-justify">
            {t.heroLede}
          </p>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
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
            <div className="flex items-center gap-3.5 bg-white p-4 sm:p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-xl font-extrabold text-[#00A896] leading-tight">
                  4,200+
                </strong>
                <span className="text-xs sm:text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  {t.heroStatStudents}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-4 sm:p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <Users className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-xl font-extrabold text-[#00A896] leading-tight">
                  860+
                </strong>
                <span className="text-xs sm:text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  {t.heroStatMentors}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-4 sm:p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-xl font-extrabold text-[#00A896] leading-tight">
                  92%
                </strong>
                <span className="text-xs sm:text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  {t.heroStatImprovement}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Feature Cards Column */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Main Classroom Image Card */}
          <div
            onClick={() => onOpenEnroll?.("Student Request")}
            className="relative rounded-3xl overflow-hidden shadow-xl border border-[#00A896]/20 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group bg-white p-2 cursor-pointer hover:shadow-2xl transition-all"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="OTOTeachers — ১-অন-১ লাইভ অনলাইন শিক্ষক মেন্টরিং"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C4A]/90 via-[#0D2C4A]/30 to-transparent pointer-events-none" />

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#02554d] text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md max-w-[90%]">
                <ShieldCheck className="w-4 h-4 text-white flex-shrink-0" />
                <span className="truncate">{lang === "bn" ? "ভেরিফাইড ব্যক্তিগত শিক্ষক" : "1-on-1 Verified Teacher"}</span>
              </div>

              {/* Text on Image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white space-y-1">
                <p className="font-sans text-base sm:text-lg font-bold leading-[1.35] text-white drop-shadow-md">
                  {lang === "bn"
                    ? "নিজের শিক্ষকের সাথে শুরু করুন ব্যক্তিগত লাইভ ক্লাস"
                    : "Start Your Personal Live Classes with Selected Tutors Today"}
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
