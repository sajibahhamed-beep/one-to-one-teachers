"use client";

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
  onOpenEnroll: () => void;
}

export default function Hero({ onOpenEnroll }: HeroProps) {
  const { t, lang } = useLanguage();

  return (
    <section className="hero relative bg-[#F4F9F9] text-[#0D2C4A] pt-14 pb-20 font-sans border-b border-[#00A896]/15">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Text Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E6F4F3] border border-[#00A896]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#00A896] tracking-wider uppercase shadow-sm mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-[#00A896]/60"></span>
            <span>OTOTEACHER — ONE-TO-ONE TEACHERS FOR ALL</span>
          </div>

          {/* Title with Balanced Standard Line Height 1.38 */}
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.38] text-[#0D2C4A] tracking-tight mb-4">
            প্রতিটি শিক্ষার্থীর জন্য{" "}
            <br className="hidden sm:inline" />
            একজন <span className="text-[#00A896]">ব্যক্তিগত ১-অন-১</span>{" "}
            শিক্ষক।
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-base sm:text-lg leading-[1.8] text-[#475569] max-w-[560px] font-normal mb-6">
            আলো শিক্ষা কোনো কোর্স বিক্রি করে না। আমরা নিম্ন আয়ের পরিবারের শিক্ষার্থীদের সাথে যাচাই, চরিত্র ও অভিজ্ঞতার ভিত্তিতে শিক্ষকদের ১-অন-১ মিলিয়ে দেই — একজন শিক্ষার্থী, একজন শিক্ষক, একটি পরিবর্তন।
          </p>

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenEnroll}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#00A896] text-white font-bold text-sm hover:bg-[#008075] shadow-lg shadow-[#00A896]/30 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>{t.heroFindMentor}</span>
              <ArrowRight className="w-4.5 h-4.5 text-white" />
            </button>

            <a
              href="#how"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E6F4F3] text-[#0D2C4A] font-bold text-sm hover:bg-[#D4ECE9] transition-colors cursor-pointer border border-[#00A896]/15"
            >
              <span>আমাদের সম্পর্কে</span>
              <Info className="w-4.5 h-4.5 text-[#0D2C4A]" />
            </a>
          </div>

          <hr className="border-t border-[#0D2C4A]/10 my-6" />

          {/* 3 Stat Cards at bottom */}
          <div className="grid grid-cols-3 gap-4 pt-1">
            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-xl font-extrabold text-[#00A896] leading-tight">
                  8,200+
                </strong>
                <span className="text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  শিক্ষার্থী ১-অন-১ শিক্ষক পেয়েছে
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <Users className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-xl font-extrabold text-[#00A896] leading-tight">
                  860+
                </strong>
                <span className="text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  সক্রিয় ও অভিজ্ঞ শিক্ষক
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-[#00A896]/15 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5.5 h-5.5" />
              </div>
              <div>
                <strong className="block font-sans text-xl font-extrabold text-[#00A896] leading-tight">
                  92%
                </strong>
                <span className="text-[11px] text-[#64748B] font-medium block leading-snug pt-0.5">
                  পরীক্ষায় পূর্ণ গ্রেড উন্নতি করেছে
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Feature Cards Column */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Main Classroom Image Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#00A896]/20 aspect-[4/3] group bg-white p-2">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="ototeacher Mentoring"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C4A]/90 via-[#0D2C4A]/30 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#00A896] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>{lang === "bn" ? "১-অন-১ ব্যক্তিগত শিক্ষক" : "1-on-1 Verified Teacher"}</span>
              </div>

              {/* Text on Image */}
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <p className="font-sans text-lg font-extrabold leading-[1.38] text-white drop-shadow-md">
                  এখনই নির্বাচিত শিক্ষকের সাথে শুরু করুন ১-অন-১ ক্লাস
                </p>
                <p className="text-xs text-[#38BDF8] font-mono font-semibold">
                  — প্রতিদিন একটি লাইভ ১-অন-১ টিচার ম্যাচ —
                </p>
              </div>
            </div>
          </div>

          {/* Free Trial Banner Box */}
          <div className="bg-[#E6F4F3] border border-[#00A896]/25 rounded-3xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#B8E6E2] text-[#00A896] flex items-center justify-center font-bold flex-shrink-0 shadow-inner">
                <UserCheck className="w-5.5 h-5.5 text-[#00A896]" />
              </div>
              <div>
                <strong className="block font-sans text-sm font-extrabold text-[#0D2C4A] leading-snug">
                  প্রথম ১-অন-১ ট্রায়াল ক্লাস সম্পূর্ণ ফ্রি
                </strong>
                <span className="text-xs text-[#64748B] font-medium block pt-0.5">
                  কোনো অগ্রিম ফি বা তথ্য লাগবে না
                </span>
              </div>
            </div>

            <button
              onClick={onOpenEnroll}
              className="px-5 py-2.5 rounded-full bg-[#00A896] text-white font-bold text-xs hover:bg-[#008075] transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              ফ্রি ক্লাস বুক করুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
