"use client";

import { useLanguage } from "../context/LanguageContext";

export default function SubjectMarquee() {
  const { t } = useLanguage();

  const subjects = [
    t.marqueeMath,
    t.marqueeEnglish,
    t.marqueePhysics,
    t.marqueeChemistry,
    t.marqueeBiology,
    t.marqueeIct,
    t.marqueeBangla,
    t.marqueeAccounting,
    t.marqueeSsc,
    t.marqueeHsc,
  ];

  // Duplicate list once to create seamless infinite loop with translateX(-50%)
  const marqueeItems = [...subjects, ...subjects];

  return (
    <div className="strip bg-[#0D2C4A] text-[#F8FAFC] py-3.5 border-t border-[#00A896]/20 overflow-hidden font-sans">
      <div className="flex items-center gap-10 w-max animate-marquee">
        {marqueeItems.map((subject, idx) => (
          <span
            key={idx}
            className="font-mono text-xs sm:text-sm tracking-wider opacity-90 whitespace-nowrap flex items-center gap-2"
          >
            <b className="text-[#38BDF8] font-bold">{subject}</b>
            <span className="text-[#F8FAFC]/70">{t.marqueeText}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
