"use client";

import { useLanguage } from "../context/LanguageContext";
import { UserCheck, CalendarCheck, Video } from "lucide-react";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: t.howStep1Num,
      title: t.howStep1Title,
      desc: t.howStep1Desc,
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      icon: UserCheck,
    },
    {
      num: t.howStep2Num,
      title: t.howStep2Title,
      desc: t.howStep2Desc,
      img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
      icon: CalendarCheck,
    },
    {
      num: t.howStep3Num,
      title: t.howStep3Title,
      desc: t.howStep3Desc,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      icon: Video,
    },
  ];

  return (
    <section id="how" className="py-24 md:py-32 bg-[#0D2C4A] text-[#F8FAFC] font-sans">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-[780px] mx-auto mb-20 space-y-4">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#38BDF8] uppercase mb-3 font-bold bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
            {t.howEyebrow}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFFFFF] leading-[1.65] tracking-normal mb-4">
            {t.howTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#F8FAFC]/85 leading-[1.85] font-normal pt-1">
            {t.howDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#16385C] border border-white/15 rounded-3xl overflow-hidden shadow-lg hover:border-[#00A896] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-52 overflow-hidden bg-[#0D2C4A]">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16385C] via-[#16385C]/30 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#00A896] text-white p-3 rounded-2xl shadow-md border border-white/20">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-7 sm:p-8 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-wider block mb-2 bg-white/10 px-3 py-1 rounded-full w-max border border-white/10">
                      {step.num}
                    </span>
                    <h3 className="font-sans text-xl font-extrabold text-white leading-snug mb-2.5 group-hover:text-[#38BDF8] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#F8FAFC]/85 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
