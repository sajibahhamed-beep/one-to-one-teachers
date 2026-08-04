"use client";

import { useLanguage } from "../context/LanguageContext";
import { Target, ShieldCheck, MapPin } from "lucide-react";

export default function ProblemSection() {
  const { t } = useLanguage();

  return (
    <section id="problem" className="py-20 md:py-24 bg-[#F8FAFC] text-[#0D2C4A] font-sans border-b border-[#0D2C4A]/10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-[720px] mx-auto mb-14 space-y-3">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00A896] uppercase mb-2 font-bold bg-[#00A896]/10 px-3.5 py-1 rounded-full border border-[#00A896]/20">
            {t.probEyebrow}
          </span>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.38] tracking-tight mb-3">
            আপনার সন্তানের মেন্টর মাত্র <br className="hidden sm:inline" />
            একটি ফরম দূরে।
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-[1.8] font-normal max-w-xl mx-auto pt-1">
            সাইন আপ করতে মাত্র ৪ মিনিট সময় লাগবে। প্রথম সেশনটি সম্পূর্ণ ফ্রি!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#0D2C4A]/10 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div className="font-sans text-4xl sm:text-5xl font-extrabold text-[#00A896]">
                {t.probStat1Num}
              </div>
              <div className="p-3 bg-[#00A896]/10 rounded-2xl text-[#00A896]">
                <Target className="w-7 h-7" />
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#475569] leading-[1.8] font-normal">
              {t.probStat1Desc}
            </p>
          </div>

          <div className="bg-white border border-[#0D2C4A]/10 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div className="font-sans text-4xl sm:text-5xl font-extrabold text-[#00A896]">
                {t.probStat2Num}
              </div>
              <div className="p-3 bg-[#00A896]/10 rounded-2xl text-[#00A896]">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#475569] leading-[1.8] font-normal">
              {t.probStat2Desc}
            </p>
          </div>

          <div className="bg-white border border-[#0D2C4A]/10 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div className="font-sans text-4xl sm:text-5xl font-extrabold text-[#00A896]">
                {t.probStat3Num}
              </div>
              <div className="p-3 bg-[#00A896]/10 rounded-2xl text-[#00A896]">
                <MapPin className="w-7 h-7" />
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#475569] leading-[1.8] font-normal">
              {t.probStat3Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
