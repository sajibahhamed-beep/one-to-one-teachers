"use client";

import { useLanguage } from "../context/LanguageContext";
import { Award, Users, MapPin, TrendingUp } from "lucide-react";

export default function ImpactSection() {
  const { t } = useLanguage();

  const districts = [
    t.districtDhaka,
    t.districtRangpur,
    t.districtBogura,
    t.districtKurigram,
    t.districtSylhet,
    t.districtChittagong,
    t.districtBarisal,
    t.districtRajshahi,
    t.districtKhulna,
    t.districtMymensingh,
    t.districtCoxsBazar,
    t.districtCharLands,
  ];

  return (
    <section id="impact" className="py-20 md:py-28 bg-[#0D2C4A] text-[#F8FAFC] font-sans">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-[720px] mx-auto mb-16 space-y-3">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#38BDF8] uppercase mb-2 font-bold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
            {t.impactEyebrow}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFFFF] leading-tight tracking-tight">
            {t.impactTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#F8FAFC]/80 leading-relaxed font-normal pt-2">
            {t.impactDesc}
          </p>
        </div>

        {/* Impact Cards Grid (Tahzib Cyan & Teal) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl">
            <Users className="w-6 h-6 text-[#38BDF8] mb-3" />
            <strong className="block font-sans text-3xl sm:text-4xl font-bold text-[#38BDF8] mb-1">
              {t.impactStat1Num}
            </strong>
            <span className="text-xs text-[#F8FAFC]/80 uppercase font-mono tracking-wider font-semibold">
              {t.impactStat1Desc}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl">
            <TrendingUp className="w-6 h-6 text-[#38BDF8] mb-3" />
            <strong className="block font-sans text-3xl sm:text-4xl font-bold text-[#38BDF8] mb-1">
              {t.impactStat2Num}
            </strong>
            <span className="text-xs text-[#F8FAFC]/80 uppercase font-mono tracking-wider font-semibold">
              {t.impactStat2Desc}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl">
            <Award className="w-6 h-6 text-[#38BDF8] mb-3" />
            <strong className="block font-sans text-3xl sm:text-4xl font-bold text-[#38BDF8] mb-1">
              {t.impactStat3Num}
            </strong>
            <span className="text-xs text-[#F8FAFC]/80 uppercase font-mono tracking-wider font-semibold">
              {t.impactStat3Desc}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl">
            <MapPin className="w-6 h-6 text-[#38BDF8] mb-3" />
            <strong className="block font-sans text-3xl sm:text-4xl font-bold text-[#38BDF8] mb-1">
              {t.impactStat4Num}
            </strong>
            <span className="text-xs text-[#F8FAFC]/80 uppercase font-mono tracking-wider font-semibold">
              {t.impactStat4Desc}
            </span>
          </div>
        </div>

        {/* District Chips */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[#38BDF8] uppercase tracking-wider mb-4 font-bold">
            <MapPin className="w-4 h-4 text-[#00A896]" />
            <span>{t.impactCommunitiesTitle}</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {districts.map((d, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-[#F8FAFC] border border-white/10"
              >
                📍 {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
