"use client";

import { useLanguage } from "../context/LanguageContext";
import { UserCheck, GraduationCap, Laptop, Sparkles, Calendar, HeartHandshake, ArrowUpRight } from "lucide-react";

interface CategoryGridProps {
  onOpenEnroll: () => void;
}

export default function CategoryGrid({ onOpenEnroll }: CategoryGridProps) {
  const { t, lang } = useLanguage();

  const categories = [
    {
      title: t.catIelts,
      desc: t.catIeltsDesc,
      icon: UserCheck,
      badge: lang === "bn" ? "১-অন-১ শিক্ষক" : "1-on-1 Tutor",
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: t.catBoardPrep,
      desc: t.catBoardPrepDesc,
      icon: GraduationCap,
      badge: lang === "bn" ? "বোর্ড প্রস্তুতি" : "Board Prep",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: t.catScience,
      desc: t.catScienceDesc,
      icon: Sparkles,
      badge: lang === "bn" ? "সায়েন্স শিক্ষক" : "Science Tutor",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: t.catIct,
      desc: t.catIctDesc,
      icon: Laptop,
      badge: lang === "bn" ? "আইসিটি শিক্ষক" : "ICT Tutor",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: t.catBatchSchedule,
      desc: t.catBatchScheduleDesc,
      icon: Calendar,
      badge: lang === "bn" ? "খালি স্লট" : "Live Slots",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: t.catFreeResource,
      desc: t.catFreeResourceDesc,
      icon: HeartHandshake,
      badge: lang === "bn" ? "৳০ ফি শিক্ষক" : "৳0 Free Tutor",
      img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className="py-14 md:py-18 bg-[#F8FAFC] border-y border-[#0D2C4A]/10 font-sans">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-9 space-y-2">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00A896] uppercase mb-1.5 font-bold bg-[#00A896]/10 px-4 py-1.5 rounded-full border border-[#00A896]/20">
            {t.catHeaderTitle}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.38] tracking-tight mb-2">
            {t.catHeaderDesc}
          </h2>
        </div>

        {/* Compact Card Grid with gap-4.5 (18px gap) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div
                key={idx}
                onClick={onOpenEnroll}
                className="bg-white border border-[#0D2C4A]/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C4A]/80 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 bg-[#00A896] text-white px-3 py-1 rounded-full text-xs font-mono font-bold shadow-md">
                    {cat.badge}
                  </span>
                  <div className="absolute bottom-3.5 right-3.5 bg-white/90 backdrop-blur-md p-2 rounded-xl text-[#0D2C4A] group-hover:bg-[#00A896] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </div>
                </div>

                <div className="p-5.5 space-y-2.5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#00A896] mb-1.5">
                      <IconComp className="w-4.5 h-4.5" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        {lang === "bn" ? "১-অন-১ টিচিং" : "1-on-1 Teaching"}
                      </span>
                    </div>
                    <h3 className="font-sans text-lg font-extrabold text-[#0D2C4A] leading-[1.38] mb-1.5">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] leading-[1.7] font-normal">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#0D2C4A]/10 flex items-center justify-between text-xs font-bold text-[#00A896] group-hover:text-[#008075]">
                    <span>{lang === "bn" ? "শিক্ষক স্পেসিফাই করুন" : "Specify Teacher"}</span>
                    <ArrowUpRight className="w-4 h-4" />
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
