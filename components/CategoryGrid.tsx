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
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00A896] uppercase mb-3 font-bold bg-[#00A896]/10 px-4 py-1.5 rounded-full border border-[#00A896]/20">
            {t.catHeaderTitle}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.65] tracking-tight mb-4">
            {t.catHeaderDesc}
          </h2>
        </div>

        {/* Redesigned Card Grid with generous breathing room & smooth interaction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div
                key={idx}
                onClick={onOpenEnroll}
                className="bg-white border border-[#0D2C4A]/12 rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(13,44,74,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(13,44,74,0.15)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                {/* Image Header with Gradient & Floating Glass Pill Badge */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#0D2C4A]/5">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C4A]/80 via-[#0D2C4A]/20 to-transparent" />
                  
                  {/* Floating Glassmorphism Badge */}
                  <span className="absolute top-4 left-4 bg-[#0D2C4A]/80 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wide shadow-md border border-white/20">
                    {cat.badge}
                  </span>

                  {/* Corner Pill Icon */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl text-[#0D2C4A] shadow-md group-hover:bg-[#00A896] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content with Generous Padding & Smooth Line Height */}
                <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-[#00A896]">
                      <div className="p-1.5 rounded-lg bg-[#00A896]/10 text-[#00A896]">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        {lang === "bn" ? "১-অন-১ টিচিং" : "1-on-1 Teaching"}
                      </span>
                    </div>

                    <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A] leading-snug tracking-tight group-hover:text-[#00A896] transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed font-normal">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Clean Action Footer Bar */}
                  <div className="pt-4 border-t border-[#0D2C4A]/10 flex items-center justify-between text-xs sm:text-sm font-bold text-[#00A896] group-hover:text-[#008075] transition-colors">
                    <span>{lang === "bn" ? "শিক্ষক স্পেসিফাই করুন" : "Specify Teacher"}</span>
                    <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
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
